const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4b2liamFlamJtYXRoZnB6dGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MzY3OTMsImV4cCI6MjA0NDExMjc5M30.flNIK7VSVYNrbZn4cwRxxr8y6kkjtOLrphPt1UBtP_Q`;
const supabaseUrl = "https://gxoibjaejbmathfpztjt.supabase.co";

if (!supabaseKey || !supabaseUrl) throw new Error("supabase auth error");

const supabase = createClient(supabaseUrl, supabaseKey);

const apiSecretKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

const encryptedApiSecretKey =
  "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");

const billingKeyMap = new Map();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 빌링키 발급
app.post("/issue-billing-key", (req, res) => {
  const { customerKey, authKey, price, recipientId } = req.body;

  // AuthKey 로 카드 빌링키 발급 API 를 호출하세요
  // @docs https://docs.tosspayments.com/reference#authkey로-카드-빌링키-발급
  fetch(`https://api.tosspayments.com/v1/billing/authorizations/issue`, {
    method: "POST",
    headers: {
      Authorization: encryptedApiSecretKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerKey,
      authKey,
    }),
  }).then(async function (response) {
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      // TODO: 빌링키 발급 실패 비즈니스 로직을 구현하세요.
      res.status(response.status).json(result);

      return;
    }

    const sponsorShipId = crypto.randomUUID();
    const insertData = {
      sponsorShipId,
      price,
      recipientId,
      sponsorId: customerKey,
      billingKey: result.billingKey,
    };
    const { error: insertError } = await supabase
      .from("sponsorShip")
      .insert(insertData);
    if (insertError) throw new Error("supabase insert error");

    const { error: selectError, data } = await supabase
      .from("userProfiles")
      .select("nickname, email")
      .eq("userId", customerKey)
      .single();

    if (selectError) throw new Error("supabase select error");
    console.log("userProfile: ", data);
    const orderId = crypto.randomUUID();
    const orderName = `나비: ${data.nickname}님의 정기후원`;
    const requestData = {
      customerKey,
      amount: +price,
      orderId,
      orderName,
      customerEmail: data.email,
      customerName: data.nickname,
    };

    const paymentRes = await fetch(
      `https://api.tosspayments.com/v1/billing/${result.billingKey}`,
      {
        method: "POST",
        headers: {
          Authorization: encryptedApiSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
    const json = await paymentRes.json();
    console.log("json: ", json);

    const insertLogData = {
      orderName,
      sponsorShipId,
      amount: price,
    };
    const { error: insertLogError } = await supabase
      .from("sponsorShipOrder")
      .insert(insertLogData);

    if (insertLogError) {
      console.log("insertLogError: ", insertLogError);
      throw new Error("supabase log insert error");
    }

    const responseData = {
      card: json.card,
      amount: json.totalAmount,
      approvedAt: json.approvedAt,
      orderId,
      orderName,
    };

    res.status(response.status).json(responseData);
  });
});

// 카드 자동결제 승인
app.post("/confirm-billing", function (req, res) {
  const {
    customerKey,
    amount,
    orderId,
    orderName,
    customerEmail,
    customerName,
  } = req.body;

  // 저장해두었던 빌링키로 카드 자동결제 승인 API 를 호출하세요.
  fetch(
    `https://api.tosspayments.com/v1/billing/${billingKeyMap.get(customerKey)}`,
    {
      method: "POST",
      headers: {
        Authorization: encryptedApiSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerKey,
        amount,
        orderId,
        orderName,
        customerEmail,
        customerName,
      }),
    }
  ).then(async function (response) {
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      // TODO: 자동결제 승인 실패 비즈니스 로직을 구현하세요.
      res.status(response.status).json(result);

      return;
    }

    // TODO: 자동결제 승인 성공 비즈니스 로직을 구현하세요.
    res.status(response.status).json(result);
  });
});

app.listen(port, () => console.log(`listen on http://localhost:${port}`));

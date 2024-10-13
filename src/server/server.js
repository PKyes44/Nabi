const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config({ path: "./.env.local" });
const { createClient } = require("@supabase/supabase-js");
const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseKey || !supabaseUrl) throw new Error("supabase auth error");

const supabase = createClient(supabaseUrl, supabaseKey);

const apiSecretKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

const encryptedApiSecretKey =
  "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 빌링키 발급
app.post("/issue-billing-key", (req, res) => {
  const { customerKey, authKey, price, recipientId } = req.body;

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
      isTermination: false,
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

cron.schedule("0 0 1 * *", function () {
  console.log("cron actived");
});

cron.schedule("* * * * *", () => {
  (async function () {
    const response = await supabase
      .from("sponsorShip")
      .select(
        "sponsorShipId, sponsorId, price, billingKey, userProfiles!sponsorShip_sponsorId_fkey(nickname, email)"
      )
      .eq("isTermination", false);
    console.log(response);
    if (response.error) {
      throw new Error(response.error);
    }
    console.log("sponsors: ", response.data);

    response.data.forEach(async (data) => {
      const orderId = crypto.randomUUID();
      const sponsorShipId = data.sponsorShipId;
      const customerKey = data.sponsorId;
      const billingKey = data.billingKey;
      const price = +data.price;
      const orderName = `나비: ${data.userProfiles.nickname}님의 정기후원`;

      const requestData = {
        customerKey,
        amount: price,
        orderId,
        orderName: orderName,
        customerEmail: data.userProfiles.email,
        customerName: data.userProfiles.nickname,
      };

      const paymentRes = await fetch(
        `https://api.tosspayments.com/v1/billing/${billingKey}`,
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
      console.log("insertLogData:", insertLogData);
      const { error: insertLogError } = await supabase
        .from("sponsorShipOrder")
        .insert(insertLogData);

      if (insertLogError) {
        console.log("insertLogError: ", insertLogError);
        throw new Error("supabase log insert error");
      }
    });
  })();
});

app.listen(port, () => console.log(`listen on http://localhost:${port}`));

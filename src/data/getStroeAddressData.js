const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
let userArray = [];
const initialDataKey = {
  연번: "storeId",
  업종: "industry",
  가맹점명칭: "storeName",
  주소1: "address",
  전화번호: "phoneNumber",
};

if (!KEY) throw new Error("KEY가 없습니다");
if (!URL) throw new Error("URL이 없습니다");

const supabase = createClient(URL, KEY);

fs.readFile("./storeAddressData.csv", "utf-8", async (err, data) => {
  const rowToData = data.split("\n");
  const dataKey = rowToData[0].split(",");
  for (let j = 0; j < rowToData.length - 1; j++) {
    if (j === 0) continue;
    const dataObject = {};
    const data = rowToData[j].split(",");
    for (let i = 0; i < rowToData.length - 1; i++) {
      if (initialDataKey[dataKey[i]] === undefined) continue;
      if (dataKey[i] === "주소2") continue;
      if (data.length !== dataKey.length) {
        if (i === 3) {
          const address1 = data[i];
          const address2 = `${data[i + 1]}, ${data[i + 2]}`;
          const newAddress1 = address2.replace('"', "");
          const newAddress2 = newAddress1.replace('"', "");
          dataObject[initialDataKey[dataKey[i]]] = `${address1} ${newAddress2}`;
          continue;
        }
        if (i === 5) {
          const phoneNumber = data[i + 1].split(" ");
          let tempData = "";
          for (tmp of phoneNumber) {
            tempData += tmp;
          }
          dataObject[initialDataKey[dataKey[i]]] = tempData;
          continue;
        }
        dataObject[initialDataKey[dataKey[i]]] = data[i];
      }
      if (i === 3) {
        const address1 = data[i];
        const address2 = data[i + 1];
        dataObject[initialDataKey[dataKey[i]]] = `${address1} ${address2}`;
        continue;
      }
      if (i === 5) {
        const phoneNumber = data[i].split(" ");
        let tempData = "";
        for (tmp of phoneNumber) {
          tempData += tmp;
        }
        dataObject[initialDataKey[dataKey[i]]] = tempData;
        continue;
      }

      dataObject[initialDataKey[dataKey[i]]] = data[i];
    }
    userArray.push(dataObject);
    const response = await supabase.from("storeData").insert(dataObject);
    console.log(response);
  }
  console.log(userArray);
});

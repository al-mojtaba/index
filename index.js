const source = require("./keys.js");
const https = require("https");

const cookiesJson = new Object();

const getToken = async () => {
  const base = async () => {
    const response = await fetch("https://my.xmarabia.net/en/member/login");
    const csrf_token = (await response.text())
      .split('name="csrf_token" value="')[1]
      .split('"/>')[0];
    cookiesJson["csrf_token"] = csrf_token;

    const cookies = response.headers.get("set-cookie");

    const cookieArray = cookies.split(", ");

    cookieArray.reduce((acc, cookie) => {
      items = ["APPSESSID", "_abck", "bm_sz", "bm_mi"];
      items.forEach((item) => {
        if (cookie.includes(item)) {
          cookiesJson[item] = cookie.slice(item.length + 1).split(";")[0];
        }
      });
    }, {});
  };

  const first = async () => {
    await base();
    const response = await fetch(
      "https://my.xmarabia.net/3sHBYR/UD/5i/AGo6/zT1ZaCh92Nje0/DuY3mQpJXpG8/WHN7XGwC/T1Ei/QFcnbCEB",
      {
        headers: {
          Cookie: `APPSESSID=${cookiesJson["APPSESSID"]}; _abck=${cookiesJson["_abck"]}; bm_sz=${cookiesJson["bm_sz"]};`,
        },
      }
    );

    const cookies = response.headers.get("set-cookie");

    cookieArray = cookies.split(", ");

    cookieArray.reduce((acc, cookie) => {
      items = ["_abck"];
      items.forEach((item) => {
        if (cookie.includes(item)) {
          cookiesJson[item] = cookie.slice(item.length + 1).split(";")[0];
        }
      });
    }, {});
  };

  const second = async () => {
    await first();

    const response = await fetch(
      "https://my.xmarabia.net/52pX_j9u/RWvL0th/rgS9Pya/Z-/OG3YLprzmQQLGO/CBoHAg/XW/4jGiwTAQUC",
      {
        method: "POST",
        headers: {
          Cookie: `APPSESSID=${cookiesJson["APPSESSID"]}; _abck=${cookiesJson["_abck"]}; bm_sz=${cookiesJson["bm_sz"]};`,
        },
        body: JSON.stringify({
          sensor_data: source,
        }),
      }
    );

    const cookies = response.headers.get("set-cookie");

    cookieArray = cookies.split(", ");

    cookieArray.reduce((acc, cookie) => {
      items = ["_abck"];
      items.forEach((item) => {
        if (cookie.includes(item)) {
          cookiesJson[item] = cookie.slice(item.length + 1).split(";")[0];
        }
      });
    }, {});
  };

  const auth = async () => {
    await second();

    const options = {
      hostname: "my.xmarabia.net",
      path: "/member/auth",
      method: "POST",
      headers: {
        Cookie: `XM_AKAMAI_VISITOR_COUNTRY=IQ; _fs_usr=true; AKA_A2=A; APPSESSID=${cookiesJson["APPSESSID"]}; _abck=${cookiesJson["_abck"]}; bm_mi=${cookiesJson["bm_mi"]}; bm_sz=${cookiesJson["bm_sz"]};`,
        "Content-Length": Buffer.byteLength(postData),
        "Cache-Control": "max-age=0",
        "Sec-Ch-Ua": '"Chromium";v="129", "Not=A?Brand";v="8"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://my.xmarabia.net",
        "Content-Type": "application/x-www-form-urlencoded",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.71 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        Referer: "https://my.xmarabia.net/en/member/login",
        "Accept-Encoding": "gzip, deflate, br",
        Priority: "u=0, i",
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseBody = "";

        res.on("data", (chunk) => {
          responseBody += chunk;
        });

        res.on("end", () => {
          const setCookie = res.headers["set-cookie"];
          if (setCookie && setCookie[1]) {
            cookiesJson["APPSESSID"] = setCookie[1].split(";")[0].slice(10);
          }
          resolve();
        });
      });

      req.on("error", (error) => {
        console.error("Error:", error.message);
        reject(error);
      });

      req.write(postData);
      req.end();
    });
  };

  const session = async () => {
    await auth();

    const response = await fetch(
      "https://social.xmarabia.net/pubapi/social-trading/v1/public/session/extend",
      {
        method: "POST",
        headers: {
          Cookie: `APPSESSID=${cookiesJson["APPSESSID"]}`,
          "Content-Length": 0,
          "Sec-Ch-Ua-Platform": "Windows",
          Authorization: "Bearer null",
          "Accept-Language": "en-US,en;q=0.9",
          "Sec-Ch-Ua": '"Chromium";v="129", "Not=A?Brand";v="8"',
          "X-St-Request-Id": "83a40936-c211-4aca-9a85-07faf1c79b43",
          "Sec-Ch-Ua-Mobile": "?0",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.71 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Origin: "https://social.xmarabia.net",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer:
            "https://social.xmarabia.net/copy-trading?tab=featured&view=cards",
          "Accept-Encoding": "gzip, deflate, br",
          Priority: "u=1, i",
        },
      }
    );

    const token = await response.json();
    cookiesJson["token"] = token.data.idToken;
  };

  await session();
};

const viewData = async () => {
  await getToken();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const discord_req = (message) => {
    fetch(
      "https://discord.com/api/webhooks/1299133400161980427/AEKsEVSJ3C5OgDzLHQrEb3uuuvY0ujF6s5HV8Xy-8NTwOggIjmlY9VDKOOltHCZZ3EFF",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "```" + message + "```",
        }),
      }
    );
  };

  let response;
  let dataJson;

  let openCheck = new Object();

  while (true) {
    await delay(3000);
    response = await fetch(
      "https://social.xmarabia.net/pubapi/social-trading/v1/social-trading/strategies/20081/components",
      {
        headers: {
          Authorization: `Bearer ${cookiesJson["token"]}`,
        },
      }
    );

    if (response.ok) {
      dataJson = await response.json();

      if (openCheck["open"] !== dataJson.data.positions[0].id) {
        discord_req(JSON.stringify(dataJson.data.positions[0]));

        openCheck["open"] = dataJson.data.positions[0].id;
      }

      if (openCheck["close"] !== dataJson.data.closedPositions[0].id) {
        discord_req(JSON.stringify(dataJson.data.closedPositions[0]));

        openCheck["close"] = dataJson.data.closedPositions[0].id;
      }

      console.log('great')
      continue;
    }

    console.log("Response not OK, retrying after getting new token...");
    await getToken();
  }
};

viewData();

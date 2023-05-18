const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const user_name = req.body.name;
  const user_email = req.body.email;
  const user_password = req.body.password;

  const data = {
    members: [
      {
        email_address: user_email,
        status: "subscribed",
        merge_fields: {
          FNAME: user_name,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/12b26bbf4f";

  const options = {
    method: "POST",
    auth: "shubham1:e0b8785f132c5f49e2b5940729ce1c38-us21",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  //   console.log(req.body.name);
  //   console.log(req.body.email);
  //   console.log(req.body.password);
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

//API KEY - e0b8785f132c5f49e2b5940729ce1c38-us21
//List Id - 12b26bbf4f

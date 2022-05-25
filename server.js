const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const PASSWORD = process.env.PASSWORD || "password";
const { MongoClient } = require("mongodb");
const path = require("path");

console.log(MONGODB_URI);

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function connect(request) {
  return new Promise((resolve) => {
    client.connect((err) => {
      if (err) {
        console.error("MongoDb connection failed", err);
        resolve(false);
      } else {
        console.log("MongoDb connected!");
        resolve(true);
      }
    });
  });
}

console.log(client);

connect().then((result) => {
  const db = client.db("pychess-variants");

  const coll = db.collection("user");

  app.get("/users", (req, res) => {
    coll
      .find(
        {},
        {
          _id: true,
        }
      )
      .toArray()
      .then((result) => {
        res.send(JSON.stringify(result));
      });
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "favicon.ico"));
  });

  app.post("/changetitle", (req, res) => {
    console.log(req.body);

    const { user, title, password } = req.body;

    if (password !== PASSWORD) {
      res.send(JSON.stringify({ error: "Not Authorized" }));
    } else {
      coll
        .updateOne(
          {
            _id: user,
          },
          {
            $set: {
              title: title,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          console.log(result);

          res.send(JSON.stringify(result));
        });
    }
  });

  app.listen(PORT, () => {
    console.log(`Liantichess titles listening at http://localhost:${PORT}`);
  });
});

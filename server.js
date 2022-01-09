const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const { MongoClient } = require("mongodb");

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

  app.get("/", (req, res) => {
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

  app.listen(PORT, () => {
    console.log(`Liatomic titles listening at http://localhost:${PORT}`);
  });
});

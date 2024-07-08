const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database("database.db");

app.use(express.json());

app.post("/api/orders", (req, res) => {
  const { items, totalPrice } = req.body;
  db.run(
    "INSERT INTO orders (items, total_price) VALUES (?, ?)",
    [JSON.stringify(items), totalPrice],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json({ message: "Order saved successfully" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

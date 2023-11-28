const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

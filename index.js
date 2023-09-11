const express = require("express");
const app = express();
const cors = require("cors");
const { authentication } = require("./middleware/authentication.middleware");
const { connection } = require("./config/db");
const { productRoute } = require("./Controller/product.routes");
const { usrRoute } = require("./Controller/user.routes");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send({ msg: "this is base API url" });
});
app.use("/user", usrRoute);

app.use(authentication);
app.use("/product", productRoute);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is listening on ${PORT}`);
  } catch (error) {
    console.log(error);
    console.log(error)
  }
});

const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.send({ msg: "Error" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.send({ msg: "Please Login" });
      } else {
        const { userId } = decoded;
        req.userId = userId;
        next();
      }
    });
  }
};
module.exports = { authentication };

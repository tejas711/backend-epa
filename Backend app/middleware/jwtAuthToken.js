const jwt = require("jsonwebtoken");

const jwtAuthToken = (newdata) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  let payload = {
    user: {
      id: newdata.id,
      name:newdata.name,
      email:newdata.email,
      isUser:newdata.isUser,
      isVendor:newdata.isVendor
    },
  };
  

  const token = jwt.sign(payload, secretKey);
  

  return token;
};
module.exports = jwtAuthToken;
const jwt = require("jsonwebtoken");

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

module.exports = (req, res, next) => {
   const Authorization = req.headers['authorization'];
   const accessToken = Authorization && Authorization.split(' ')[1];

   if (!accessToken) return res.status(400).json({error: "Access Denied!, Access token required"});

   try {
        const {userID, role } = jwt.verify(accessToken, JWT_SECRET);
        req.role = role;
        req.userId = userID;
        next();

      } catch (err) {
          res.status(400).send({
            error: "Auth failed, check accessToken"
        });
    }
};
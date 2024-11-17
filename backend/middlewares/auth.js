const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Session exprired login again" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to check if the user has access based on role and country
const checkRole =
  (requiredRole, allowAnyCountry = false) =>
  (req, res, next) => {
    const { role, country } = req.user;

    // if (requiredRole && role !== requiredRole) {
    //   return res
    //     .status(403)
    //     .json({ message: "Access denied: insufficient role" });
    // }

    if (
      !allowAnyCountry &&
      role === "Viewer" &&
      req.body.country &&
      req.body.country !== country
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: country restriction" });
    }

    next();
  };

module.exports = { checkRole, verifyJwt };

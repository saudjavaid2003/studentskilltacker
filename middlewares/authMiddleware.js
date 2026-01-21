// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authWithRole = (...roles) => {
  return (req, res, next) => {
    try {
      const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id,
        role: decoded.role
      };

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
      }

      next();
    } catch (err) {
      console.error("AuthWithRole Error:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }
  next();
};
// middleware/auth.js
export const isStudent = (req, res, next) => {
  if (req.user?.role !== "student") {
    return res.status(403).json({ message: "Forbidden: Students only" });
  }
  next();
};

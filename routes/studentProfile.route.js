const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getFullProfile,
} = require("../controllers/studentProfile.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const isStudent = require("../middleware/isStudent.middleware.js");

router.post("/profile", authMiddleware, isStudent, createProfile);


router.put("/profile", authMiddleware, isStudent, updateProfile);


router.get("/profile", authMiddleware, getProfile);


router.delete("/profile", authMiddleware, isStudent, deleteProfile);

router.get("/profile/full", authMiddleware, getFullProfile);

module.exports = router;

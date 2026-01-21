const express = require("express");
const router = express.Router();
const {
  createProfile,
  updateProfile,
  getProfile,
  deleteProfile,
  addSkill,
  updateSkill,
  deleteSkill,
  addAcademic,
  updateAcademic,
  deleteAcademic,
  getFullProfile,
} = require("../controllers/studentProfile.controller.js");
const isStudent = require("../middleware/isStudent.middleware.js");
const authMiddleware = require("../middleware/auth.middleware.js");

// -------------------- PROFILE --------------------
// Create Profile
router.post("/profile", authMiddleware, isStudent, createProfile);

// Update Profile
router.put("/profile", authMiddleware, isStudent, updateProfile);

// Get Profile
router.get("/profile", authMiddleware, getProfile);

// Delete Profile
router.delete("/profile", authMiddleware, isStudent, deleteProfile);

// -------------------- SKILLS --------------------
router.post("/profile/skills", authMiddleware, isStudent, addSkill);
router.put("/profile/skills/:skillId", authMiddleware, isStudent, updateSkill);
router.delete("/profile/skills/:skillId", authMiddleware, isStudent, deleteSkill);

// -------------------- ACADEMICS --------------------
router.post("/profile/academics", authMiddleware, isStudent, addAcademic);
router.put("/profile/academics/:academicId", authMiddleware, isStudent, updateAcademic);
router.delete("/profile/academics/:academicId", authMiddleware, isStudent, deleteAcademic);

// -------------------- FULL PROFILE --------------------
router.get("/profile/full", authMiddleware, getFullProfile);

module.exports = router;

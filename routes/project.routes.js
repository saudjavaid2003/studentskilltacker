const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const isStudent = require("../middleware/isStudent.middleware.js");

router.post("/projects", authMiddleware, isStudent, createProject);
router.get("/projects", authMiddleware, isStudent, getProjects);
router.get("/projects/:id", authMiddleware, isStudent, getProjectById);
router.put("/projects/:id", authMiddleware, isStudent, updateProject);
router.delete("/projects/:id", authMiddleware, isStudent, deleteProject);

module.exports = router;

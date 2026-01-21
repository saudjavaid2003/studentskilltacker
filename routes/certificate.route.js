// routes/certification.routes.js
const express = require("express");
const {
  addCertification,
  getMyCertifications,
  deleteCertification,
  getAllCertifications,
  verifyCertification,
} = require("../controllers/certification.controller.js");

const { isStudent, isAdmin } = require("../middleware/authMiddleware.js");
const { uploadCertificates } = require("../middlewares/multer.middleware.js");
const authenticate = require("../middleware/authWithRole.js");

const router = express.Router();

// -------------------
// Student Routes
// -------------------

// Add certificates (multiple files)
router.post("/addcertificate", authenticate, isStudent, uploadCertificates, addCertification);

// Get own certificates
router.get("/certificate", authenticate, isStudent, getMyCertifications);

// Delete own certificate
router.delete("/certificate/:id", authenticate, isStudent, deleteCertification);


module.exports = router;

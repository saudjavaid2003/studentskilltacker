const Certificate = require("../models/certification.model.js");

const addCertification = async (req, res) => {
  try {
    const { title, org, credentialUrl } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const imagePath = req.file ? req.file.path : null;

    const newCertification = new Certificate({
      studentId,
      title,
      org,
      credentialUrl,
      imagePath,
    });

    await newCertification.save();

    return res.status(201).json({
      success: true,
      message: "Certification added successfully",
      certification: newCertification,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error adding certification",
      error: err.message,
    });
  }
};
const getCertifications = async (req, res) => {
    try{
        const studentId=req.user.id;
        if(!studentId){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const certifications= await Certificate.find({ studentId });
        return res.status(200).json({ certifications });


    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}
const deleteCertification = async (req, res) => {

    try{
        const studentId=req.user.id;
        const deletecertificationId=req.params.id;
        if(!studentId){
            return res.status(401).json({ message: "Unauthorized" });

        }
        const certification= await Certificate.findOne({ _id: deletecertificationId, studentId });
        if(!certification){
            return res.status(404).json({ message: "Certification not found" });
        }
        await Certificate.findByIdAndDelete(deletecertificationId);
        return res.status(200).json({ message: "Certification deleted successfully" });

    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { addCertification, getCertifications, deleteCertification };
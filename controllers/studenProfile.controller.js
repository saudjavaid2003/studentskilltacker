const studentProfile = require("../models/studentProfile.model.js");

const createProfile = async (req, res) => {
  try {
    const { degree, semester, cgpa, technicalSkills, softSkills, academics } = req.body;
    const userId = req.user.id;

    const existingProfile = await studentProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ success: false, message: "Profile already exists" });
    }

    const newProfile = new studentProfile({
      userId,
      degree,
      semester,
      cgpa,
      technicalSkills: technicalSkills || [],
      softSkills: softSkills || [],
      academics: academics || [],
    });

    await newProfile.save();

    return res.status(201).json({ success: true, message: "Profile created successfully", profile: newProfile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error creating profile", error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfile.findOne({ userId });

    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    return res.status(200).json({ success: true, message: "Profile fetched successfully", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error fetching profile", error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { degree, semester, cgpa, technicalSkills, softSkills, academics } = req.body;

    const profile = await studentProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    profile.degree = degree ?? profile.degree;
    profile.semester = semester ?? profile.semester;
    profile.cgpa = cgpa ?? profile.cgpa;
    profile.technicalSkills = technicalSkills ?? profile.technicalSkills;
    profile.softSkills = softSkills ?? profile.softSkills;
    profile.academics = academics ?? profile.academics;

    await profile.save();

    return res.status(200).json({ success: true, message: "Profile updated successfully", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error updating profile", error: err.message });
  }
};

// Delete Profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfile.findOne({ userId });

    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    await studentProfile.findOneAndDelete({ userId });
    return res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error deleting profile", error: err.message });
  }
};

const getFullProfile = getProfile;

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getFullProfile,
};

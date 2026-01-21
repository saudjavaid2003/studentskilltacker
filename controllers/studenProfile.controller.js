const studentProfile = require("../models/studentProfile.model.js");

// -------------------- PROFILE --------------------

// Create Profile
const createProfile = async (req, res) => {
  try {
    const { degree, semester, cgpa, technicalSkills, softSkills, academics } = req.body;
    const userId = req.user.id;

    // Check if profile already exists
    const existingProfile = await studentProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const newProfile = new studentProfile({
      userId,
      degree,
      semester,
      cgpa,
      technicalSkills: technicalSkills || [],
      softSkills: softSkills || [],
      academics: academics || [], // expected as [{ semester, courses: [{ course, grade, score }] }]
    });

    await newProfile.save();

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile: newProfile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error creating profile",
      error: err.message,
    });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: err.message,
    });
  }
};

// Update Profile (general info only)
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { degree, semester, cgpa } = req.body; // only general fields

    const profile = await studentProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    profile.degree = degree ?? profile.degree;
    profile.semester = semester ?? profile.semester;
    profile.cgpa = cgpa ?? profile.cgpa;

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: err.message,
    });
  }
};

// Delete Profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await studentProfile.findOneAndDelete({ userId });

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error deleting profile",
      error: err.message,
    });
  }
};

// -------------------- SKILLS --------------------

// Add Skill
const addSkill = async (req, res) => {
  try {
    const { skill, type } = req.body; // type: "technical" or "soft"
    const userId = req.user.id;

    const profile = await studentProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    if (type === "technical") profile.technicalSkills.push(skill);
    else if (type === "soft") profile.softSkills.push(skill);
    else
      return res.status(400).json({ success: false, message: "Invalid skill type" });

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Skill added successfully",
      profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update Skill
const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { skill, type } = req.body;
    const userId = req.user.id;

    const profile = await studentProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    let skillArray;
    if (type === "technical") skillArray = profile.technicalSkills;
    else if (type === "soft") skillArray = profile.softSkills;
    else return res.status(400).json({ success: false, message: "Invalid skill type" });

    if (!skillArray[skillId]) return res.status(404).json({ success: false, message: "Skill not found" });

    skillArray[skillId] = skill;
    await profile.save();

    return res.status(200).json({ success: true, message: "Skill updated successfully", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Skill
const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { type } = req.body;
    const userId = req.user.id;

    const profile = await studentProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    let skillArray;
    if (type === "technical") skillArray = profile.technicalSkills;
    else if (type === "soft") skillArray = profile.softSkills;
    else return res.status(400).json({ success: false, message: "Invalid skill type" });

    if (!skillArray[skillId]) return res.status(404).json({ success: false, message: "Skill not found" });

    skillArray.splice(skillId, 1);
    await profile.save();

    return res.status(200).json({ success: true, message: "Skill deleted successfully", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- ACADEMICS --------------------

// Add Academic Record (semester-wise)
const addAcademic = async (req, res) => {
  try {
    const { semester, course, grade, score } = req.body;
    const userId = req.user.id;

    const profile = await studentProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    let sem = profile.academics.find((a) => a.semester === semester);
    if (!sem) {
      sem = { semester, courses: [] };
      profile.academics.push(sem);
    }

    sem.courses.push({ course, grade, score });
    await profile.save();

    return res.status(200).json({ success: true, message: "Academic record added", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update Academic Record
const updateAcademic = async (req, res) => {
  try {
    const { academicId } = req.params;
    const { semester, course, grade, score } = req.body;
    const userId = req.user.id;

    const profile = await studentProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    const sem = profile.academics.find((a) => a.semester === semester);
    if (!sem) return res.status(404).json({ success: false, message: "Semester not found" });

    const record = sem.courses.id(academicId); // using Mongoose subdocument _id
    if (!record) return res.status(404).json({ success: false, message: "Academic record not found" });

    record.course = course ?? record.course;
    record.grade = grade ?? record.grade;
    record.score = score ?? record.score;

    await profile.save();
    return res.status(200).json({ success: true, message: "Academic record updated", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Academic Record
const deleteAcademic = async (req, res) => {
  try {
    const { academicId } = req.params;
    const { semester } = req.body;
    const userId = req.user.id;

    const profile = await studentProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    const sem = profile.academics.find((a) => a.semester === semester);
    if (!sem) return res.status(404).json({ success: false, message: "Semester not found" });

    const index = sem.courses.findIndex((c) => c._id.toString() === academicId);
    if (index === -1) return res.status(404).json({ success: false, message: "Academic record not found" });

    sem.courses.splice(index, 1);
    await profile.save();

    return res.status(200).json({ success: true, message: "Academic record deleted", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- FULL PROFILE --------------------
const getFullProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfile.findOne({ userId });

    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    return res.status(200).json({ success: true, message: "Full profile fetched", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  addSkill,
  updateSkill,
  deleteSkill,
  addAcademic,
  updateAcademic,
  deleteAcademic,
  getFullProfile,
};

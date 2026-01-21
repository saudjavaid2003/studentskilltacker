import mongoose from "mongoose";

const StudentProfileSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  degree: { type: String, default: "BSCS" },
  semester:   { type: Number },
  cgpa:       { type: Number, min: 0, max: 4.0 },

  technicalSkills: [{ type: String }],
  softSkills:      [{ type: String }], 

  academics: [{
    course: String,
    grade: String,
    score: Number, // optional numeric score
  }],
}, { timestamps: true });

export default mongoose.model("StudentProfile", StudentProfileSchema);

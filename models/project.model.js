import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:     { type: String, required: true },
  description: String,
  techStack:   [{ type: String }],
  score:       Number, 
  link :String,
  
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);

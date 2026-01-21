import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:     { type: String, required: true },
  org:       { type: String },
  credentialUrl: { type: String },

  imagePath: { type: String }, // e.g: '/uploads/certs/abc.png'
}, { timestamps: true });

export default mongoose.model("Certification", CertificationSchema);

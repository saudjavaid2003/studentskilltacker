import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:     { type: String, required: true },
  org:       { type: String }, // e.g. Coursera, Google
  issueDate: { type: Date },
  expiryDate:{ type: Date },
  credentialUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("Certification", CertificationSchema);

const CertificationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  org: { type: String },
  credentialUrl: { type: String },
  imagePath: { type: String, required: true },
}, { timestamps: true });


const Certification = mongoose.model("Certification", CertificationSchema);

module.exports = Certification;
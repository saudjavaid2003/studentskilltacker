const StudentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  degree: { type: String, default: "BSCS" },
  semester: { type: Number }, // current semester
  cgpa: { type: Number, min: 0, max: 4.0 },

  technicalSkills: [{ type: String }],
  softSkills: [{ type: String }],

  academics: [
    {
      semester: { type: Number, required: true },
      courses: [
        {
          course: { type: String, required: true },
          grade: { type: String },
          score: { type: Number }, // optional numeric score
        },
      ],
    },
  ],
}, { timestamps: true });
export default mongoose.model("StudentProfile", StudentProfileSchema);
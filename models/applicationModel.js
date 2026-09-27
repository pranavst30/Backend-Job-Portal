import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    resume: {
      type: String,
    },
    status: {
      type: String,
      default: "applied",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);

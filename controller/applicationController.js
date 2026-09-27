import Application from "../models/applicationModel.js";
import fs from "fs";
import Job from "../models/jobsModel.js";

export const createApplication = async (req, res, next) => {
  const userId = req.user.userId;
  const jobId = req.params.jobId;
  const job = await Job.findById(jobId);

  if (!job) return next("no job exists with this id");
  if (job.status !== "open") return next("this job is no longer accepting applications");

  const application = new Application({ userId, jobId });
  if (req.file) application.resume = req.file.path;
  const savedApp = await application.save();
  res.status(201).json({
    message: "Your application was submitted",
    success: true,
    savedApp,
  });
};

export const deleteApplication = async (req, res, next) => {
  const userId = req.user.userId;
  const applicationId = req.params.id;
  const application = await Application.findOne({ _id: applicationId });
  if (!application) return next("no application exist with this id");

  if (application.userId.toString() !== userId)
    return next("You are not authorized");

  const resumePath = application.resume;
  if (resumePath) {
    try {
      await fs.promises.unlink(resumePath);
    } catch (error) {
      if (error.code !== "ENOENT") return next("something went wrong");
    }
  }

  await Application.deleteOne({ _id: applicationId });

  res
    .status(200)
    .json({ success: true, message: "application deleted successfully" });
};

export const getMyApplications = async (req, res, next) => {
  const { sort } = req.params;
  const queryObject = { userId: req.user.userId };
  let queryResult = Application.find(queryObject);

  if (sort === "latest") queryResult = queryResult.sort("-createdAt");
  if (sort === "oldest") queryResult = queryResult.sort("createdAt");

  const application = await queryResult;

  res.status(200).json({
    success: true,
    totalApplications: application.length,
    application,
  });
};

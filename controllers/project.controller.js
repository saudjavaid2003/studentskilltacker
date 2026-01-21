const Project = require("../models/project.model.js");

const createProject = async (req, res) => {
  try {
    const { title, description, techStack, score, link } = req.body;
    const studentId = req.user.id;

    const newProject = new Project({
      studentId,
      title,
      description,
      techStack: techStack || [],
      score,
      link,
    });

    await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating project",
      error: err.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const studentId = req.user.id;
    const projects = await Project.find({ studentId });
    return res.status(200).json({ success: true, projects });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;
    const project = await Project.findOne({ _id: id, studentId });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    return res.status(200).json({ success: true, project });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;
    const { title, description, techStack, score, link } = req.body;

    const project = await Project.findOne({ _id: id, studentId });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.techStack = techStack ?? project.techStack;
    project.score = score ?? project.score;
    project.link = link ?? project.link;

    await project.save();
    return res.status(200).json({ success: true, message: "Project updated successfully", project });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;
    const project = await Project.findOne({ _id: id, studentId });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    await Project.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

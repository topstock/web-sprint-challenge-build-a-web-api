// Write your "projects" router here!
const express = require("express");
const projectsRouter = express.Router();
const Projects = require("./projects-model");

const validateProject = require("./projects-middleware");

projectsRouter.get("/:id/actions", async (req, res) => {
  const actions = await Projects.getProjectActions(req.params.id);
  console.log(actions);
  try {
    if (actions.length) {
    res.status(200).json(actions);
    } else {
      res.status(200).json([]);
    }
  } catch (error){
      console.error(error);
      res.status(500).json({ message: error});
  }
});

projectsRouter.get("/:id", async (req, res) => {
  const project = await Projects.get(req.params.id);
  try {
    if (project) {
    res.status(200).json(project);
    } else {
      res.status(404).json({ message: "There is no project with that id."})
    }
  } catch (error){
      console.error(error);
      res.status(500).json({ message: error});
  }
});

projectsRouter.get("/", async (req, res) => {
    const projects = await Projects.get() || [];
  try {
    res.status(200).json(projects);
  } catch (error){
      console.error(error);
      res.status(404)
  }
});


projectsRouter.post("/", validateProject, async (req, res) => {
  const newProject = await Projects.insert(req.body);
  try {
    res.status(201).json(newProject);
  } catch (error){
    res.status(500).json({ message: error});
  }
});

projectsRouter.put("/:id", validateProject, async (req, res) => {
  if ( Object.keys(req.body).includes("completed")) {
    const updatedProject = await Projects.update(req.params.id, req.body);
    try {
      res.status(200).json(updatedProject);
    } catch (error){
      console.error(error);
      res.status(500).json({ message: error});
    }
  } else {
    res.status(400).json({ message: "Enter completed status"});
  }

});

projectsRouter.delete("/:id", async (req, res, next) => {
  const project = await Projects.get(req.params.id);
  try {
    if (!project) {
     res.status(404).json({ message: "Project not found" });
    }
  } catch (error){
    res.status(500).json({ message: error});
  }
  
  await Projects.remove(req.params.id);
  try {
    res.status(200).json();
  } catch (error){
    res.status(500).json({ message: error});
  }
});

module.exports = projectsRouter;
// Write your "projects" router here!
const express = require('express');
const projectsRouter = express.Router();
const Projects = require('./projects-model');
const validateProject = require('./projects-middleware');

projectsRouter.get('/:id', async (req, res) => {
  const project = await Projects.get(req.params.id);
  try {
    if (project) {
    console.log({project});
    res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'There is no project with that id.'})
    }
  } catch (error){
      console.error(error);
      res.status(500).json({ message: error});
  }
});

projectsRouter.get('/', async (req, res) => {
    const projects = await Projects.get() || [];
    try {
      res.status(200).json(projects);
    } catch (error){
        console.error(error);
        res.status(404)
    }
});



projectsRouter.post('/', validateProject, async (req, res) => {
  const newProject = await Projects.insert(req.body);
  try {
    console.log({newProject});
    res.status(200).json(newProject);
  } catch (error){
      console.error(error);
      res.status(500).json({ message: error});
  }
});

module.exports = projectsRouter;
// Write your "actions" router here!
const express = require('express');
const actionsRouter = express.Router();
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

const validateAction = require('./actions-middlware');

actionsRouter.get('/:id', async (req, res) => {
  const action = await Actions.get(req.params.id);
  try {
    if (action) {
    res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'There is no action with that id.'})
    }
  } catch (error){
    console.error(error);
    res.status(500).json({ message: error});
  }
});

actionsRouter.get('/', async (req, res) => {
  const actions = await Actions.get() || [];
  try {
    res.status(200).json(actions);
  } catch (error){
    console.error(error);
    res.status(404)
  }
});

actionsRouter.post('/', validateAction, async (req, res, next) => {
  const project = await Projects.get(req.body.project_id)
  try { 
    if (!project) { 
      res.status(404).json({ message: 'Project with this id not found'});
    }
    } catch (error){ 
      next(error);
    }
  const newAction = await Actions.insert(req.body);
  try {
    res.status(201).json(newAction);
  } catch (error){
    res.status(500).json({ message: error});
  }
});

actionsRouter.put('/:id', validateAction, async (req, res) => {
  const updatedAction = await Actions.update(req.params.id, req.body);
  try {
    res.status(200).json(updatedAction);
  } catch (error){
    console.error(error);
    res.status(500).json({ message: error});
  }
});

actionsRouter.delete('/:id', async (req, res, next) => {
  const action = await Actions.get(req.params.id);
  try {
    if (!action) {
     res.status(404).json({ message: "Action not found" });
    }
  } catch (error){
    res.status(500).json({ message: error});
  }
  
  await Actions.remove(req.params.id);
  try {
    res.status(200).json();
  } catch (error){
    res.status(500).json({ message: error});
  }
});

module.exports = actionsRouter;
// add middlewares here related to projects
function validateProject(req, res, err, next) {
  if (!Object.keys(req.body).includes('name') || !Object.keys(req.body).includes('description')) {
    res.status(400).json({ message: 'Enter a project a name and description'});
  } else {
      next();
  }
}

module.exports = validateProject;
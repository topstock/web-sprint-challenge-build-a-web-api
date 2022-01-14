// add middlewares here related to projects
function validateProject(req, res, next) {
  if (!req.body || !req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Enter a project a name and description'});
  } else {
    next();
  }
}

module.exports = validateProject;
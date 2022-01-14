// add middlewares here related to actions
function validateAction(req, res, next) {
    if (!req.body || !req.body.notes || !req.body.description|| !req.body.project_id) {
        res.status(400).json({ message: 'Enter an action description and notes'});
      } else {
        next();
      }
}

module.exports = validateAction;
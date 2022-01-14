function logger(req, res, next) {
      console.log(`[$new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`)
}

function validateProject(req, res, next) {
}

function validateAction(req, res, next) {

}
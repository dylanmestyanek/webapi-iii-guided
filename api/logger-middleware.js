const logger = (req, res, next) => {
    console.log(`MY CUSTOM LOGGER: [${new Date().toISOString()}] ${req.method} to ${req.path} from ${req.get('host')}`)
    next();
}

module.exports = logger;


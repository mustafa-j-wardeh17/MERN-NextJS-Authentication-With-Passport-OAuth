const Logger = (req, res, next) => {
    console.log(`\n${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}\n`)
    next();
}

export default Logger
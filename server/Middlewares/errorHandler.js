export const notFoundPage = (req, res, next) => {
    const error = new Error(`${req.originalUrl} does not found`)
    res.status(404)
    next(error)
}

export const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({ msg: error.message })
}
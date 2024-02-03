import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            msg: 'User Not Autherized'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        console.log(`user id ${decoded.id}`)
        next()
    }
    catch (err) {
        return res.status(500).send({ msg: 'Server Error' })
    }
}


// user with authedUser id can access this
export const verifyUserToken = (req, res, next) => {
    const token = req.cookies.token;
    const { authedUser } = req.body
    if (!token) {
        res.status(401).json({
            msg: 'User Not Autherized'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(`user id ${decoded.id}`)
        // check userId in request body matches the one in the token 
        if (authedUser._id === decoded.id) {
            req.userId = decoded.id;
            console.log(`user id ${decoded.id}`)
            next()
        }
        else {
            res.status(403).json({ msg: `Unauthorized User ${decoded.id} ` })
        }
    }
    catch (err) {
        res.status(500).send({ msg: 'Server Error' })
    }
}


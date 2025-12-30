import jwt from 'jsonwebtoken'
import UserStatus from '../models/UserStatus.js'

const Auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) return res.status(401).json({ msg: 'Access denied' });
        req.user = decoded.id
        const userStatus = await UserStatus.findOne({ userId: decoded.id })
        if (userStatus.status == "suspended") {
            return res.status(401).json({ msg: 'Your account is suspended' })
        }
        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' })
    }
}

export default Auth
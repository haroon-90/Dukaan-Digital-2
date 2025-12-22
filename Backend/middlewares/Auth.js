import jwt from 'jsonwebtoken'

const Auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) return res.status(401).json({ msg: 'Access denied' });
        req.user = decoded.id
        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' })
    }
}

export default Auth
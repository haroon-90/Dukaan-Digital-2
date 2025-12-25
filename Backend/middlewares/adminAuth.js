import User from '../models/User.js';

const AdminAuth = async (req, res, next) => {
    try {
        req.user
        const user = await User.findById(req.user)
        if (user.role == "admin") {
            next()
        } else {
            return res.status(401).json({ msg: 'Access denied' });
        }
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' })
    }
}

export default AdminAuth
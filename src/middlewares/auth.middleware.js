import jwt from 'jsonwebtoken';
import AsyncHandler from '../utils/Asynchandler.js';

const auth = AsyncHandler(async (req, res, next) => {
    const token = req.cookies.token

    
    if (!token) {
        throw new AppError(401, "Unauthorized Access")
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    )

    
    req.user = decoded

    next()

})

export default auth
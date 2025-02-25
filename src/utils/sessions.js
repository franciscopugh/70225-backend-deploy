import 'dotenv/config'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'


export const generateToken = (user) => {
    const token = jwt.sign({user}, process.env.SECRET_JWT, {expiresIn: '24h'})
    return token
}

export const updateLastConnection = async (userId) => {
    await userModel.findByIdAndUpdate(userId, {
        last_connection: new Date()
    })
}
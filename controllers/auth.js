// import the User model
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

// register - works
const register = async (req, res) => {
    //create user
    const user = await User.create({ ...req.body}) 
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name}, token })
}
// login
const login = async (req, res) => {
    const {email, password} = req.body

    // verify if email or pasword had been provided
    if (!email || !password){
        throw new BadRequestError('Please provide email and password. 1')
    }
    // check for user email
    const user = await User.findOne({ email })
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials. 2')
    }
    // check for password
    const isPasswordCorrect = await user.comparePassword( password )
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}
module.exports = {
    register, login,
}
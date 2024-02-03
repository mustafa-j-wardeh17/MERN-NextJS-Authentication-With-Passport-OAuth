import User from "../Models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
//----------------------------------------------
//--------------Register Controller-------------
//----------------------------------------------
export const RegisterController = async (req, res) => {
    const { password, confirmPassword, email, firstName, lastName } = req.body
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
        return res.status(400).json({ msg: "Please fill all fields" })
    }
    else if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' })
    }
    try {
        const findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(400).json({ msg: "Email is already in use!" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            role: 'email',
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
        // Save the user to the database
        const createdUser = await user.save()
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
        res.cookie('token', token)
        res.status(201).json({
            msg: 'User Successfully Registered',
            userId: createdUser._id
        });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Something went wrong oops' })
    }
}

//----------------------------------------------
//---------------Login Controller---------------
//----------------------------------------------
export const LoginController = async (req, res) => {
    const { password, email } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill all fields" })
    }

    try {
        const findUser = await User.findOne({ email })
        if (!findUser) {
            return res.status(400).json({ msg: "Oops:Email Deos Not Registered" })
        }

        const isMatch = await bcrypt.compare(password, findUser.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Email Or Password" })
        }
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
        res.cookie('token', token)
        res.status(201).json({
            msg: 'User Successfully Logged In',
            userId: findUser._id
        });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Something went wrong oops' })
    }
}
//----------------------------------------------
//---------------OAuth Controller---------------
//----------------------------------------------
export const OAuthLogin = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
        res.cookie('token', token)
        res.redirect('http://localhost:3000/login/success')
    }
    catch (error) {
        return res.status(500).json({ msg: 'Something went wrong oops' })
    }
}
//----------------------------------------------
//---------------OAuth Controller---------------
//----------------------------------------------
export const VerifyOAuth = (req, res) => {
    try {
        return res.status(200).json({ msg: 'User Authenticated Successfully' })
    }
    catch (error) {
        return res.status(500).json({ msg: 'Something went wrong oops' })
    }
}

export const DeleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(400).json({ msg: "No User Found With This Id" })
        }
        res.clearCookie("token")

        res.status(200).json({ msg: `User Has Been Deleted Succesfully` })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const logoutController = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        msg: 'User Logged Out Successfully'
    })
}
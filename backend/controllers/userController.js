import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/config.js"
import { WEB_URL } from "../config/config.js"
import User from "../models/User.js"
import sendVerificationEmail from "../util/emails/sendVerificationToken.js"
import { generateVerificationToken } from "../util/generation.js"


export const registUser = async (req, res) => {


    try {

        const { email, username, password } = req.body


        const userExist = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }


            ]
        })

        if (userExist) {


            if (userExist.email === email.toLowerCase()) {

                return res.status(400).send("email already exists")
            }
            if (userExist.username === username.toLowerCase()) {

                return res.status(400).send("username already exists")
            }
        }

        const verificationToken = generateVerificationToken()
        const tokenExpireDate = new Date();

        tokenExpireDate.setHours(tokenExpireDate.getHours() + 24)

        const userInfo = new User({
            username,
            email,
            password,
            token: verificationToken,
            expireDate: tokenExpireDate
        })


        await userInfo.save()

        userInfo.password = undefined

        const verificationLink = `${WEB_URL}/users/verify-user?token=${verificationToken}&userId=${userInfo._id}`


        sendVerificationEmail(email, verificationLink)
        return res.status(200).send(userInfo)



    } catch (err) {

        console.log("[REGISTER_USER]", err);
        res.status(400).send(err.message)

    }

}

export const verifyUser = async (req, res) => {

    try {

        const { token, userId: _id } = req.query


        const user = await User.findOne({ _id, token })

        if (!user) {

            return res.status(400).send("Invalid Token")
        }

        const expirationTime = user.expireDate


        if (!expirationTime || expirationTime < new Date()) {
            res.status(400).send("Token Has Expired")
        }
        const maxAge = new Date()
        // cuurent Date


        maxAge.setHours(maxAge.getHours() - 24)

        if (expirationTime < maxAge) {
            res.status(400).send("Token Has Expired")
        }

        user.isEmailConfirmed = true
        user.token = undefined
        user.expireDate = undefined



        await user.save()

        return res.status(200).send({ status: true, message: "Verification successfully" })



    } catch (err) {
        console.log("[REGISTER_USER]", err);
        return res.status(400).send(err.message)

    }

}

export const login = async (req, res) => {


    const { username, email, password } = req.body



    const isUserExist = await User.findOne({

        $or: [
            { username: username?.toLowerCase() },
            { email: email?.toLowerCase() }
        ]
    }).select("+password")

    if (!isUserExist.isEmailConfirmed) {
        return res.status(401).send(" Confirm your email First")


    }

    if (!isUserExist) {
        return res.status(401).send("invalid username or email")
    }

    const ValidPassword = await isUserExist.comparePassword(password)

    if (!ValidPassword) {
        return res.status(404).send("invalid password")
    }


    // jwt


    // const expiresIn = 2 * 60
    const expiresIn = 7 * 24 * 60 * 60;

    const token = jwt.sign({ _id: isUserExist._id }, JWT_SECRET_KEY, { expiresIn })

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: expiresIn * 1000,

    })

    isUserExist.password = undefined




    return res.status(200).send({ ...isUserExist.toJSON(), expiresIn })




}

export const logoutUser = (req, res) => {

    try {

        res.clearCookie("token");

        res.send("Logout successfully");

    } catch (error) {
        console.log("error on logout", error);
    }

};
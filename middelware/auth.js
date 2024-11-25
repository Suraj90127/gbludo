import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"
import cookieParser from "cookie-parser";
import express from "express"
const app=express()

app.use(cookieParser());

export const isAuthenticatedUser = async (req, res, next) => {
    const  token  = req.cookies.token;
    try {
        // console.log("tokenn", token)
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "login user access this step",
                token

            })
        }
        const decdedData = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await userModel.findById(decdedData.id)
        // res.status(200).send({
        //     success: true,
        //     message: " user login Successfully",
        // })
        next()

      

    } catch (error) {
          res.status(500).send({
            success: false,
            message: " internal server error",
        })
    }



}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles?.includes(req?.user?.role)) {
            return res.status(401).send({
                success: false,
                message: "User can't accss for this rsource",

            })
        }
        next()
    }
}


import {Router} from "express"
import AuthController from "../controller/auth.controller.js";
const authRouter =  Router();

authRouter.post("/signup",async(req,res)=>{
    try {
       const authController = new AuthController();
       await authController.signUpUser(req,res); 
    } catch (error) {
        console.log("Auth Global Error : ",error)
    }
})

authRouter.post("/signin",async(req,res)=>{
    try {
        const authController = new AuthController();
        await authController.signInUser(req,res); 
     } catch (error) {
         console.log("Auth Global Error : ",error)
     }
})


export default authRouter;
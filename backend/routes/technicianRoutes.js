import express from "express";
import {verifyToken} from "../middleware/authMiddleware.js";
import {supabase} from "../config/supabase.js";


const router = express.Router();



router.get(
"/tickets",
verifyToken,
async(req,res)=>{


    try{


        const engineer_id = req.user.engineer_id;



        const {data,error}=await supabase
        .from("tickets")
        .select("*")
        .eq(
            "engineer_id",
            engineer_id
        );



        if(error){

            return res.status(500).json({
                error:error.message
            });

        }



        res.json(data);


    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }


});


export default router;
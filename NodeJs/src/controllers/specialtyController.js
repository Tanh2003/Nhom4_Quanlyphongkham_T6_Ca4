import specialtyService from "../services/specialtyServices";

let createSpecialty= async(req,res)=>{
    try {
        let infor=await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor)
        
    } catch (e) {

        console.log(e)
        return res.status(200).json({
            errcode:-1,
            errMessage:"Error from sever .. . . ."
        })
        
    }

}



let getAllSpecialty= async(req,res)=>{
    try {
        let infor=await specialtyService.getAllSpecialty();
        return res.status(200).json(infor)
        
    } catch (e) {

        console.log(e)
        return res.status(200).json({
            errcode:-1,
            errMessage:"Error from sever .. . . ."
        })
        
    }

}
module.exports={
    createSpecialty:createSpecialty,
    getAllSpecialty:getAllSpecialty

}
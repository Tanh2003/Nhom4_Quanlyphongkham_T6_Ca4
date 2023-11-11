import db from "../models/index";
let createSpecialty=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {

        
            if(!data.name||!data.imageBase64||!data.descriptionHTML||!data.descriptionMarkdown){
                resolve({
                    errcode:1,
                    errMessage:"missing parameter"
                    
                })
            }else{
                await db.Specialty.create({
                    name:data.name,
                    image:data.imageBase64,
                    descriptionHTML:data.descriptionHTML,
                    descriptionMarkdown:data.descriptionMarkdown

                })
                resolve({
                    errcode:0,
                    errMessage:"tao thanh cong"
                    
                })

            }
           
            
        } catch (e) {
            reject(e);
            
        }
    })

}


let getAllSpecialty=()=>{
    return new Promise(async(resolve,reject)=>{
        try {

        
            let data=await db.Specialty.findAll();
            if(data&& data.length>0){
             data.map(item=>{
                item.image=Buffer.from(item.image,'base64').toString('binary');
                return item;

             })
            }
            resolve({
                errcode:0,
                errMessage:"tao thanh cong",
                data
                
            })
           
            
        } catch (e) {
            reject(e);
            
        }
    })

}
module.exports={
    createSpecialty:createSpecialty,
    getAllSpecialty:getAllSpecialty

}
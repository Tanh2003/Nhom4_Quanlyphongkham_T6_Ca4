import db from '../models/index';
import CRUDservices from '../services/CRUDservices';
let getHomePage = async (reg,res)=>{
    try{
        let data=await db.User.findAll();// tìm tất cả dữ liệu trong bảng users
        console.log('------------------------------');
        console.log(data);
        console.log('------------------------------');
        return res.render('homepage.ejs',{

            data:JSON.stringify(data)
        
        });
    }catch (e){
        console.log(e);

    }
    
}


let getAboutPage = (reg,res)=>{

    return res.render('test/about.ejs');
}
let getCRUD =(reg,res)=>{
    return res.render('test/crud.ejs');
    
}

let postCRUD = async(reg,res)=>{
  let message=  await CRUDservices.createNewUser(reg.body);
  console.log(message);
   
    return res.send('post crud from sever');
}

// biến data  sẽ gọi hàm  lấy  dữ liệu bên services.
let displayGetCRUD = async(reg,res)=>{

    let data =await CRUDservices.getAllUser({
        raw:true,
    });
   
    return res.render('displayCRUD.ejs',{
        dataTable:data,// gắn giá  trị của biến data vào dataTable để qua view sử dụng vòng lặp.
    });
}
let getEditCRUD= async(req,res)=>{
    let userId =req.query.id;
    console.log(userId)
    if(userId){
        let userData= await CRUDservices.getUserInfoById(userId);
       //check user data not found

        // let userData
        return res.render('editCRUD.ejs',{
            user:userData
        })
    }
    else{
        return res.send("Users not found!");
    }
   
    
}

let putCRUD=async(req,res)=>{
    let data= req.body;
    await CRUDservices.updateUserData(data);
    return res.redirect("/get-crud");
}

let deleteCRUD=async(req,res)=>{
    let id =req.query.id;
    if(id){
        await CRUDservices.deleteUserById(id);
        return res.redirect("/get-crud");
    }
    else{
        return res.send("User not Found!")
    }

    


}

// crl+/ để commendline
module.exports={
    getHomePage:getHomePage,
    getAboutPage:getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
    

}
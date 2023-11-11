import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


// Insert dữ liệu vào database
let createNewUser = async(data)=>{
    return new  Promise(async( resolve,reject)=>{
        try{
            let hashPasswordFromBcrypt=await hashUserPassword(data.password);
            await db.User.create({
                email:data.email,
                password:hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastname,
                address:data.address,
                phoneNumber:data.phonenumber,
                gender: data.gender=='1'?true:false, 
                roleId: data.roleId,
                
            });

               resolve('oke create user succeed');

        }catch(e){
            reject(e);
        }

    })
    
}
// chuyển mật khẩu sang bảo mật 
let hashUserPassword =(password)=>{
return new Promise(async(resolve,reject)=>{
  try{
    let hashPassword = await bcrypt.hashSync(password, salt);
    resolve(hashPassword);
  }catch(e){
    reject(e);
  }
});
}

// lấy tất cả dữ liệu từ database đẩy lên view 
let getAllUser= async()=>{
return new Promise((resolve,reject)=>{
  try{

    let users =db.User.findAll();
    resolve(users)

  }catch(e){
    reject(e);
  }
})
}

let getUserInfoById=(userId)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let user = await db.User.findOne({
        where:{id:userId}
      });
      if(user)
      {
        resolve(user)
      }else{
        resolve({})
      }
      
    } catch (e) {
      reject(e);
      
    }
  })

}

let updateUserData=(data)=>{
return new Promise(async(resolve,reject)=>{
  try {
    let user = await db.User.findOne({
      where:{id:data.id},
      raw:false
    })
    if(user){
      user.fistName=data.firstName;
      user.lastName=data.lastName;
      user.address=data.address;
      await user.save(); //  muốn không bị lỗi TypeError: user.save is not a function thì vào config.json đổi raw: true --> false  là đc
      resolve();
    }
    else{
      resolve();

    }
  } catch (e) {
    reject(e)
    
  }
})
}

 let deleteUserById=(userId)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let user = await db.User.findOne({
        
        where: {id:userId}
      })

      if(user){
        let user = await db.User;
      await user.destroy({
        where: { id: userId },
      });
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  })
 }

module.exports={
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserById:deleteUserById
   
}
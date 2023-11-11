
import db from "../models/index";
import emailServices from "../services/emailServices";
require("dotenv").config();
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail=(doctorId, token) => {

          let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
 return result;

}









let postBookAppointment=(data)=>{
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.email||!data.doctorId||!data.timeType||!data.date||!data.fullName||!data.selectedGender||!data.address){
                resolve({
                    errCode:1,
                    errMessage:"missing parameter"
                })
            }else{
let token =uuidv4();
await emailServices.sendSimpleEmail({
    reciverEmail:data.email,
    patientName:data.fullName,
time:data.timeString,
doctorName:data.doctorName,
language:data.language,
redirectLink:buildUrlEmail(data.doctorId,token)

});







                let user =await db.User.findOrCreate({
                    where:{email:data.email},
                    defaults:{
                        email: data.email,
                        roleId:'R3',
                        gender:data.selectedGender,
                        address:data.address,
                        firstName:data.fullName
                    },
                });
//create a boooking record
                if(user&&user[0]){
                    await db.Booking.findOrCreate({
                        where:{patientId:user[0].id},
                        defaults:{
                            statusId:'S1',
                            doctorId:data.doctorId,
                            patientId:user[0].id,
                            date:data.date,
                            timeType:data.timeType,
                            token:token
                        }
                    })
                }


            }
          
    
          resolve({
           errCode:0,
           errMessage:"lưu thông tin bệnh nhân thành công"
          });
        } catch (e) {
          reject(e);
        }
      });
}





let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject)=>{
    try {
        if (!data.token || !data.doctorId){
            resolve({
                errCode: 1,
                errMessage: 'Missing parameter'
            })
        }
        else {
            let appointment = await db.Booking.findOne({ 
                where: {
                doctorId: data.doctorId,
                token: data.token,
                statusId: 'S1'
                },
                raw: false
                })

                if(appointment){
                    appointment.statusId='S2';
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'cập nhật đặt lịch thành công'
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: 'không tìm thấy trạng thái đặt lịch'
                    })
                }
        }
    } catch (e) {
        reject(e)
    }
    })
}

module.exports={
   postBookAppointment: postBookAppointment,
   postVerifyBookAppointment:postVerifyBookAppointment
}
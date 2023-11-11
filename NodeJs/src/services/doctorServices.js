import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
import emailServices from "../services/emailServices";

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errcode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      resolve({
        errcode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let saveDetailInforDoctor = (InputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !InputData.doctorId ||
        !InputData.contentHTML ||
        !InputData.contentMarkdown ||
        !InputData.action ||
        !InputData.selectedPrice ||
        !InputData.selectedPayment ||
        !InputData.selectedProvince ||
        !InputData.nameClinic ||
        !InputData.addressClinic ||
        !InputData.note
      ) {
        resolve({
          errcode: 1,
          errMessage: "missing parameter",
          InputData,
        });
      } else {
        if (InputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: InputData.contentHTML,
            contentMarkdown: InputData.contentMarkdown,
            description: InputData.description,
            doctorId: InputData.doctorId,
          });
        } else if (InputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: InputData.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = InputData.contentHTML;
            doctorMarkdown.contentMarkdown = InputData.contentMarkdown;
            doctorMarkdown.description = InputData.description;

            await doctorMarkdown.save();
          }
        }

        //upsert to Doctor_info table

        let doctorInfor = await db.Doctor_Infor.findOne({
          where: {
            doctorId: InputData.doctorId,
          },
          raw: true,
        });
        if (doctorInfor) {
          await db.Doctor_Infor.update(
            {
              priceId: InputData.selectedPrice,
              provinceId: InputData.selectedProvince,
              paymentId: InputData.selectedPayment,
              nameClinic: InputData.nameClinic,
              addressClinic: InputData.addressClinic,
              note: InputData.note,
            },
            {
              where: {
                doctorId: InputData.doctorId,
              },
            }
          );
        } else {
          await db.Doctor_Infor.create({
            doctorId: InputData.doctorId,
            priceId: InputData.selectedPrice,
            provinceId: InputData.selectedProvince,
            paymentId: InputData.selectedPayment,
            nameClinic: InputData.nameClinic,
            addressClinic: InputData.addressClinic,
            note: InputData.note,
          });
        }

        resolve({
          errcode: 0,
          errMessage: "Save infor doctor succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errcode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        // code nayf convert anh de sai

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errcode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getExtraInforDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errcode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Doctor_Infor.findOne({
          where: {
            doctorId: inputId,
          },
          attributes: {
            exclude: ["id", "doctorId"],
          },

          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],

          raw: false,
          nest: true,
        });

        if (!data) {
          data = {};
        }
        resolve({
          errcode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileInforDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errcode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        // code nayf convert anh de sai

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errcode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param!",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }

        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formatedDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        // //convert date
        // if (existing && existing.length > 0) {
        //   existing = existing.map(item => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          // return a.timeType === b.timeType && a.date === b.date;
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
          mag: toCreate,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListPatientForDoctor = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            doctorId: doctorId,
            date: date,
            statusId: "S2",
          },

          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: ["email", "firstName", "address", "gender"],

              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },

            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let senRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.patientId ||
        !data.timeType ||
        !data.imgBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            patientId: data.patientId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }
        await emailServices.sendAttachment(data);
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileInforDoctorById: getProfileInforDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  senRemedy: senRemedy,
};

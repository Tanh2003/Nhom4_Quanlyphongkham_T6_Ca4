import doctorServices from "../services/doctorServices";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;

  if (!limit) limit = 10;
  try {
    let response = await doctorServices.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      message: "Error from sever....",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorServices.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever...",
    });
  }
};
let postInfoDoctor = async (req, res) => {
  try {
    let response = await doctorServices.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever...",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorServices.getDetailDoctorById(req.query.id);
    return res.status(200).json(
      infor
      );
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever .. . . .",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor1 = await doctorServices.bulkCreateSchedule(req.body);
    return res.status(200).json(infor1);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever .. . . .",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorServices.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever .. . . .",
    });
  }
};

let getExtraInforDoctor= async (req, res) => {
  try {
    let infor = await doctorServices.getExtraInforDoctorById(
      req.query.doctorId,
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever .. . . .",
    });
  }
};

 let getProfileInforDoctor = async (req, res) => {
  try {
    let infor = await doctorServices.getProfileInforDoctorById(
      req.query.doctorId,
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever .. . . .",
    });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let infor = await doctorServices.getListPatientForDoctor(
      req.query.doctorId,req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever .. . . .",
    });
  }
};


let senRemedy = async (req, res) => {
  try {
    let infor = await doctorServices.senRemedy(
      req.body
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever .. . . .",
    });
  }
};


module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctor: postInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctor:getExtraInforDoctor,
  getProfileInforDoctor:getProfileInforDoctor,
  getListPatientForDoctor:getListPatientForDoctor,
  senRemedy:senRemedy
};

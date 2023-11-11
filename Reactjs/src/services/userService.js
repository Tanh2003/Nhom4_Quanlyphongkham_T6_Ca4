import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUser = (inputId) => {
  //teamplate String
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUseService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  //return axios.delete('/api/delete-user',{id:userId})
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctor = () => {
  return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const CreateNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get("/api/get-all-specialty");
};
const saveBulkScheduleDoctor = (data) => {
  console.log("cai datane:",data);
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );


};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-infor-doctor-by-id?doctorId=${doctorId}`);
};



const postPatientBookAppointment = (data) => {

  console.log("xemdata: ",data);
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {

  return axios.post("/api/veryfy-book-appoiment", data);
};




const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};


const postSendRemedy = (data) => {
  console.log("xemdata: ",data);
  return axios.post("/api/send-remedy", data);
};



export {
  handleLoginApi,
  getAllUser,
  createNewUseService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctorService,
  getDetailInforDoctor,
  CreateNewSpecialty,
  getAllSpecialty,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  getAllPatientForDoctor,
  postSendRemedy
};

import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUseService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctorService,
} from "../.././services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //     type:actionTypes.FETCH_GENDER_START
      // })
      let res = await getAllCodeService("GENDER");
      if (res && res.errcode === 0) {
        dispatch(fetchGenderSucess(res.data));
      } else {
        dispatch(fetchGenderFailed());
        console.log("loi");
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSucess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAIDED,
});

export const fetchPositionSucess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSucess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("position");
      if (res && res.errcode === 0) {
        dispatch(fetchPositionSucess(res.data));
      } else {
        dispatch(fetchPositionFailed());
        console.log("loi");
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errcode === 0) {
        dispatch(fetchRoleSucess(res.data));
      } else {
        dispatch(fetchRoleFailed());
        console.log("loi");
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUseService(data);

      if (res && res.errcode === 0) {
        toast.success("Tạo mới người dùng thành công !");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart()); // code nay de cho khi them user no hien len trang them lun
      } else {
        toast.error("Tạo mới người dùng thất bại !");
        dispatch(saveUserFailed());
        console.log("loi");
      }
    } catch (e) {
      toast.error("Tạo mới người dùng thất bại !");
      dispatch(saveUserFailed());
      console.log(e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");

      if (res && res.errcode === 0) {
        dispatch(fetchAllUsersSucess(res.users.reverse()));
      } else {
        toast.error("lấy danh sách  người dùng thất bại !");
        dispatch(fetchAllUsersFailed());
        console.log("loi");
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log(e);
    }
  };
};

export const fetchAllUsersSucess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (UserId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(UserId);

      if (res && res.errcode === 0) {
        toast.success("Xóa người dùng thành công !");
        dispatch(deleteUserSuccsess());
        dispatch(fetchAllUsersStart()); // code nay de cho khi them user no hien len trang them lun
      } else {
        toast.error("Xóa người dùng thất bại !");
        dispatch(deleteUserFailed());
        console.log("loi");
      }
    } catch (e) {
      toast.error("Xóa người dùng thất bại !");
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};

export const deleteUserSuccsess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);

      if (res && res.errcode === 0) {
        toast.success("Cập nhập người dùng thành công !");
        dispatch(editUserSuccsess());
        dispatch(fetchAllUsersStart()); // code nay de cho khi them user no hien len trang them lun
      } else {
        toast.error("Cập nhập người dùng thất bại !");
        dispatch(editUserFailed());
        console.log("loi");
      }
    } catch (e) {
      toast.error("Cập nhập người dùng thất bại !");
      dispatch(editUserFailed());
      console.log(e);
    }
  };
};

export const editUserSuccsess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//action lien quan den load bac si

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errcode == 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errcode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctor();
      if (res && res.errcode == 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetaiDatalDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errcode == 0) {
        toast.success("Thêm Thông tin bác sĩ thành công !");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Thêm Thông tin thất bại !");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Thêm Thông tin thất bại !");
      console.log("SAVE_DETAIL_DOCTOR_FAILED", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};








export const getAllRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
          type:actionTypes.FETCH_REQUIRED_DOCTOR_PRICE_START
      })
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      if (resPrice && resPrice.errcode === 0&&
        resPayment&&resPayment.errcode===0&& resProvince&&resProvince.errcode===0
        ) {
          let data={
            resPrice:resPrice.data,
            resPayment:resPayment.data,
            resProvince:resProvince.data
          }

          
        dispatch(fetchRequiredDoctorInforSucess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
     
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("RequiredDoctorInfor error",e);
    }
  };
};



export const fetchRequiredDoctorInforSucess = (allrequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_PRICE_SUCCESS,
  data: allrequiredData,
});

export const fetchRequiredDoctorInforFailed= () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_PRICE_FAIDED,
});
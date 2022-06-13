import {
    SET_FULLNAME,
    SET_GENDER,
    SET_EMAIL,
    SET_NUMBERPHONE,
    SET_DATEOFBIRTH,
    SET_CMND,
    SET_PASSWORD,
    SET_AVATAR,
    SET_IDACCOUNT,
    DELETE_AVATAR,
} from '~/constants/userConstants';

export const initStateUser = {
    IDNHANVIEN: '',
    TENNHANVIEN: '',
    GIOITINH: '',
    NAMSINH: '',
    SDT: '',
    EMAIL: '',
    HINHANH: '',
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case SET_FULLNAME:
            return {
                ...state,
                TENNHANVIEN: action.payload,
            };
            break;
        case SET_PASSWORD:
            return {
                ...state,
                PASSWORD: action.payload,
            };
            break;
        case SET_CMND:
            return {
                ...state,
                CCCD: action.payload,
            };
            break;
        case SET_IDACCOUNT:
            return {
                ...state,
                IDACCOUNT: action.payload,
            };
            break;
        case SET_GENDER:
            return {
                ...state,
                GIOITINH: action.payload,
            };
            break;
        case SET_EMAIL:
            return {
                ...state,
                EMAIL: action.payload,
            };
            break;
        case SET_NUMBERPHONE:
            return {
                ...state,
                SDT: action.payload,
            };
            break;
        case SET_DATEOFBIRTH:
            return {
                ...state,
                NAMSINH: action.payload,
            };
            break;
        case SET_AVATAR:
            return {
                ...state,
                HINHANH: action.payload,
            };
            break;
        case DELETE_AVATAR:
            return {
                ...state,
                HINHANH: '',
            };
            break;
        default:
            throw new Error();
    }
};

import { SET_NAMEREGISTER, SET_PASSWORDREGISTER, SET_REPASSWORDREGISTER } from '~/constants/registerConstants';

// init state
export const initStateRegister = {
    TENTAIKHOAN: '',
    MATKHAU: '',
    REMATKHAU: '',
};

export const registerReducer = (state, action) => {
    switch (action.type) {
        case SET_NAMEREGISTER:
            return {
                ...state,
                TENTAIKHOAN: action.payload,
            };
            break;
        case SET_PASSWORDREGISTER:
            return {
                ...state,
                MATKHAU: action.payload,
            };
            break;
        case SET_REPASSWORDREGISTER:
            return {
                ...state,
                REMATKHAU: action.payload,
            };
            break;
        default:
            throw new Error();
    }
};

import { SET_NAMELOGIN, SET_PASSWORDLOGIN } from '~/constants/loginConstants';

// init state
export const initStateLogin = {
    TENTAIKHOAN: '',
    MATKHAU: '',
};

export const loginReducer = (state, action) => {
    switch (action.type) {
        case SET_NAMELOGIN:
            return {
                ...state,
                TENTAIKHOAN: action.payload,
            };
            break;
        case SET_PASSWORDLOGIN:
            return {
                ...state,
                MATKHAU: action.payload,
            };
            break;
        default:
            throw new Error();
    }
};

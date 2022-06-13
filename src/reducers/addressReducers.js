import { SET_IDACCOUNT, SET_SHIPPINGINFONAME, SET_ADDRESS, SET_SHIPPINGINFOPHONE } from '~/constants/addressConstants';

export const initStateAddress = {
    ID_TAIKHOAN : '',
    TENNGUOINHAN: '',
    TENDIACHI: '',
    SDT: '',
};

export const addressReducer = (state, action) => {
    switch (action.type) {
        case SET_IDACCOUNT:
            return {
                ...state,
                ID_TAIKHOAN : action.payload,
            };
            break;
        case SET_SHIPPINGINFONAME:
            return {
                ...state,
                TENNGUOINHAN: action.payload,
            };
            break;
        case SET_ADDRESS:
            return {
                ...state,
                TENDIACHI: action.payload,
            };
            break;
        case SET_SHIPPINGINFOPHONE:
            return {
                ...state,
                SDT: action.payload,
            };
            break;
        default:
            throw new Error();
    }
};

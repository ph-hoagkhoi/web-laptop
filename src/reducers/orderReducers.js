import { SET_SHOPPINGINFOID, SET_IDACCOUNT, SET_TOTAL } from '~/constants/orderConstants';

// init state
export const initStateOrder = {
    ID_GIAOHANG: '',
    ID_TAIKHOAN: '',
    THANHTIEN: 0,
};

export const orderReducer = (state, action) => {
    switch (action.type) {
        case SET_SHOPPINGINFOID:
            return {
                ...state,
                ID_GIAOHANG: action.payload,
            };
            break;
        case SET_IDACCOUNT:
            return {
                ...state,
                ID_TAIKHOAN: action.payload,
            };
            break;
        case SET_TOTAL:
            return {
                ...state,
                THANHTIEN: action.payload,
            };
            break;
        default:
            throw new Error();
    }
};

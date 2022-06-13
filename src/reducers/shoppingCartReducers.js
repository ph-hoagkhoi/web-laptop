import {
    SET_IDACCOUNT,
    SET_IDSP,
    SET_QUANTITYUP,
    SET_QUANTITYDOWN,
    SET_QUANTITY,
} from '~/constants/shoppingCartConstants';

export const initStateShoppingCart = {
    ID_TAIKHOAN: '',
    ID_SANPHAM: '',
    SOLUONG: 1,
};

export const shoppingCartReducer = (state, action) => {
    switch (action.type) {
        case SET_IDACCOUNT:
            return {
                ...state,
                ID_TAIKHOAN: action.payload,
            };
            break;
        case SET_QUANTITY:
            return {
                ...state,
                SOLUONG: 1,
            };
            break;
        case SET_IDSP:
            return {
                ...state,
                ID_SANPHAM: action.payload,
            };
            break;
        case SET_QUANTITYUP:
            return {
                ...state,
                SOLUONG: state.SOLUONG + 1,
            };
            break;
        case SET_QUANTITYDOWN:
            return {
                ...state,
                SOLUONG: state.SOLUONG - 1,
            };
            break;
        default:
            throw new Error();
    }
};

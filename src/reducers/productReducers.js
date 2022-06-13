import {
    ADD_PRODUCT,
    SET_ID,
    SET_NAME,
    SET_DESCRIPTION,
    SET_PRICE,
    SET_IMG,
    DELETE_IMG,
    SET_BRAND,
    SET_THONGSO,
    SET_SOLUONG,
} from '~/constants/productConstants';

// init state
export const initState = {
    ID_SANPHAM: '',
    ID_THELOAI: '',
    TENSANPHAM: '',
    GIA: '',
    GIOITHIEU: '',
    THONGSO: '',
    SOLUONG: 0,
    IMG: [],
};

export const productDetailsReducer = (state, action) => {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                ID_SANPHAM: action.payload,
            };
            break;
        case SET_THONGSO:
            return {
                ...state,
                THONGSO: action.payload,
            };
            break;
        case SET_SOLUONG:
            return {
                ...state,
                SOLUONG: action.payload,
            };
            break;
        case SET_BRAND:
            return {
                ...state,
                ID_THELOAI: action.payload,
            };
            break;
        case SET_NAME:
            return {
                ...state,
                TENSANPHAM: action.payload,
            };
            break;

        case SET_DESCRIPTION:
            return {
                ...state,
                GIOITHIEU: action.payload,
            };
            break;
        case SET_PRICE:
            return {
                ...state,
                GIA: action.payload,
            };
            break;
        case SET_IMG:
            return {
                ...state,
                IMG: [...state.IMG, action.payload],
            };
            break;
        case DELETE_IMG:
            return {
                ...state,
                IMG: state.IMG.filter((item) => item !== action.payload),
            };
            break;
        case ADD_PRODUCT:
            return {
                ...state,
            };
            break;
        default:
            throw new Error();
    }
};

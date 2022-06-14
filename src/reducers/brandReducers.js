import {
    SET_BRANDNAME,
    SET_DESCRIPTIONBRAND,
    ADD_BRAND,
    SET_IMAGEBRAND,
    DELETE_IMAGEBRAND,
} from '~/constants/brandConstants';

export const initStateBrand = {
    ID_THELOAI: '',
    TENTHELOAI: '',
    MOTATHELOAI: '',
    ANHMOTA: '',
};

export const detailBrandReducer = (state, action) => {
    switch (action.type) {
        case SET_BRANDNAME:
            return {
                ...state,
                TENTHELOAI: action.payload,
            };
            break;
        case SET_DESCRIPTIONBRAND:
            return {
                ...state,
                MOTATHELOAI: action.payload,
            };
            break;
        case SET_IMAGEBRAND:
            return {
                ...state,
                ANHMOTA: action.payload,
            };
            break;
        case DELETE_IMAGEBRAND:
            return {
                ...state,
                ANHMOTA: '',
            };
            break;
        case ADD_BRAND:
            return {
                ID_THELOAI: action.payload.ID_THELOAI,
                TENTHELOAI: action.payload.TENTHELOAI,
                MOTATHELOAI: action.payload.MOTATHELOAI,
                ANHMOTA: action.payload.ANHMOTA,
            };
            break;
        default:
            throw new Error();
    }
};

import { SET_BRANDNAME, SET_DESCRIPTIONBRAND, ADD_BRAND } from '~/constants/brandConstants';

export const initStateBrand = {
    ID_THELOAI: '',
    TENTHELOAI: '',
    MOTATHELOAI: '',
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
        case ADD_BRAND:
            return {
                ID_THELOAI: action.payload.ID_THELOAI,
                TENTHELOAI: action.payload.TENTHELOAI,
                MOTATHELOAI: action.payload.MOTATHELOAI,
            };
            break;
        default:
            throw new Error();
    }
};

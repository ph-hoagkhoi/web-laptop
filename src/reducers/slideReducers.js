import {
    SET_IMG01,
    SET_IMG02,
    SET_IMG03,
    SET_IMG04,
    DELETE_IMG01,
    DELETE_IMG02,
    DELETE_IMG03,
    DELETE_IMG04,
    ADD_SLIDE,
} from '~/constants/sliderConstants';

export const initStateSlide = {
    ID_ANH: '1',
    ANH1: '',
    ANH2: '',
    ANH3: '',
    ANH4: '',
};

export const slideReducer = (state, action) => {
    switch (action.type) {
        case SET_IMG01:
            return {
                ...state,
                ANH1: action.payload,
            };
            break;
        case SET_IMG02:
            return {
                ...state,
                ANH2: action.payload,
            };
            break;
        case SET_IMG03:
            return {
                ...state,
                ANH3: action.payload,
            };
            break;
        case SET_IMG04:
            return {
                ...state,
                ANH4: action.payload,
            };
            break;

        case DELETE_IMG01:
            return {
                ...state,
                ANH1: '',
            };
            break;
        case DELETE_IMG02:
            return {
                ...state,
                ANH2: '',
            };
            break;
        case DELETE_IMG03:
            return {
                ...state,
                ANH3: '',
            };
            break;
        case DELETE_IMG04:
            return {
                ...state,
                ANH4: '',
            };
            break;
        case ADD_SLIDE:
            return {
                ...state,
                ANH1: action.payload[0].ANH1,
                ANH2: action.payload[0].ANH2,
                ANH3: action.payload[0].ANH3,
                ANH4: action.payload[0].ANH4,
            };
            break;
        default:
            throw new Error();
    }
};

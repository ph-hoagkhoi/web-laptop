import {
    SET_IDACCOUNT,
    SET_IDSP,
    SET_QUANTITYUP,
    SET_QUANTITYDOWN,
    SET_QUANTITY,
} from '~/constants/shoppingCartConstants';

export const setIDAccount = (payload) => {
    return {
        type: SET_IDACCOUNT,
        payload,
    };
};

export const setIDSP = (payload) => {
    return {
        type: SET_IDSP,
        payload,
    };
};

export const setQuantityUP = () => {
    return {
        type: SET_QUANTITYUP,
    };
};
export const setQuantityDown = () => {
    return {
        type: SET_QUANTITYDOWN,
    };
};
export const setQuantity = () => {
    return {
        type: SET_QUANTITY,
    };
};

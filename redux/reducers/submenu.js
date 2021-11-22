import { UPDATE_SUBMENU } from '../actionTypes';

const initialState = {
    submenu: [],
};

const submenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SUBMENU:
            return {
                ...state,
                submenu: action.payload.submenu,
            }
        default: 
            return state;
    }
};

export default submenuReducer;
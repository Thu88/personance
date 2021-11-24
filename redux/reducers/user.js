import { UPDATE_USER } from '../actionTypes';

const initialState = {
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload.user,
            }
        default: 
            return state;
    }
};

export default userReducer;
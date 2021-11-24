import { createStore, combineReducers } from 'redux';
import submenuReducer from './reducers/submenu';
import userReducer from './reducers/user';

const rootReducer = combineReducers({ 
   submenu: submenuReducer,
   user: userReducer
});

export const store = createStore(
    rootReducer,    
);
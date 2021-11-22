import { createStore, combineReducers } from 'redux';
import submenuReducer from './reducers/submenu';

const rootReducer = combineReducers({ 
   submenu: submenuReducer,
});

export const store = createStore(
    rootReducer,    
);
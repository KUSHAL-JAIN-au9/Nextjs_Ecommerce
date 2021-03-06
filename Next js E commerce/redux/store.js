// IMPORTING CREATESTORE
import { createStore, applyMiddleware, compose} from 'redux';

import rootReducer from './rootReducer';

// REDUX-DEVTOOLS FOR DEBUGGING REDUX
// import {composeWithDevTools} from "redux-devtools-extension";

// REDUX-LOGGER MIDDLEWARE
import logger from "redux-logger";

// REDUX-THUNK
import thunk from "redux-thunk";

const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

export default store;
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import homepageReducer from './components/homePageComponent/homePageReducer';

const rootReducer = combineReducers({
    // add reducers here
    homepageReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
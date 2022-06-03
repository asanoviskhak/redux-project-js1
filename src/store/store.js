import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import moviesReducer from './slices/movies'
import userReducer from './slices/user'

const rootReducer = combineReducers({
    movies: moviesReducer,
    user: userReducer
});


export const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));
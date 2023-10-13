import {configureStore} from '@reduxjs/toolkit';
import mainReducer from './MainSlice'

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export default store;

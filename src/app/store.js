import { configureStore } from '@reduxjs/toolkit'

import viewReducer from '../pages/view/viewSlice'
import newReducer from '../pages/new/newSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    view: viewReducer,
    new: newReducer,
    app: appReducer,
  },
})
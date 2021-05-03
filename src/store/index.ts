import { createDispatchHook, createSelectorHook } from 'react-redux'
import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import ReduxThunk, { ThunkDispatch } from 'redux-thunk'
import ui from '../modules/ui'
import score from '../modules/score'
import label from '../modules/label'

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      ui,
      score,
      label,
    }),
    applyMiddleware(ReduxThunk),
  )

  return store
}

export type State = ReturnType<ReturnType<typeof createStore>['getState']>
export type Action = Parameters<ReturnType<typeof createStore>['dispatch']>[0]

export const useSelector = createSelectorHook<State, Action>()
export const useDispatch: () => ThunkDispatch<State, unknown, Action> = createDispatchHook<State, Action>()

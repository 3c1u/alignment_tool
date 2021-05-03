import { ThunkAction } from 'redux-thunk'
import { State as RootState } from '../store'

// state

export interface Label {
  position: number
  phoneme: string
}

export interface State {
  delay: number
  labels: Label[]
}

const initialState: State = {
  delay: 0,
  labels: [],
}

// actions
export const SET_LABELS = 'label/SET_LABELS'
export const SET_DELAY = 'label/SET_DELAY'

export const setDelay = (delay: number) =>
  ({
    type: SET_DELAY,
    delay,
  } as const)

export const setLabels = (labels: Label[]) =>
  ({
    type: SET_LABELS,
    labels,
  } as const)

export type Action = ReturnType<typeof setLabels | typeof setDelay>

// operations

export const loadLabels = (
  labelFile: File,
): ThunkAction<Promise<void>, RootState, unknown, Action> => async (
  dispatch,
  _,
) => {
  const labels = (await labelFile.text()).split('\n').map((l) => {
    const [start, _, phoneme] = l.split(' ')
    return {
      position: parseFloat(start),
      phoneme,
    }
  })

  dispatch(setLabels(labels))
}

// reducer

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_LABELS: {
      const { labels } = action
      return { ...state, labels }
    }
    case SET_DELAY: {
      const { delay } = action
      return { ...state, delay }
    }
    default:
      break
  }

  return state
}

export default reducer

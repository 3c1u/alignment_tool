export const SET_SCALE = 'ui/SET_SCALE'
export const PLUS_SCALE = 'ui/PLUS_SCALE'

export interface State {
  scale: number
}

const initialState: State = {
  scale: 30,
}

export const setScale = (scale: number) =>
  ({
    type: SET_SCALE,
    scale,
  } as const)

export const plusScale = (deltaScale: number) =>
  ({
    type: PLUS_SCALE,
    deltaScale,
  } as const)


export type Action = ReturnType<typeof setScale | typeof plusScale>

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_SCALE: {
      const { scale } = action
      return { ...state, scale }
    }
    case PLUS_SCALE: {
      const { deltaScale } = action
      return { ...state, scale: Math.max(1, state.scale + deltaScale) }
    }
    // break
    default:
      break
  }

  return state
}

export default reducer

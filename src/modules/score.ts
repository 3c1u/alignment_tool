import { ThunkAction } from 'redux-thunk'
import { State as RootState } from '../store'

// state

export interface Note {
  position: number
  length: number
  noteNumber: number
  lyrics?: string
}

export interface State {
  tempo: number
  notes: Note[]
}

const initialState: State = {
  tempo: 120,
  notes: [],
}

// actions

export const SET_TEMPO = 'score/SET_TEMPO'
export const SET_NOTES = 'score/SET_NOTES'

export const setTempo = (tempo: number) =>
  ({
    type: SET_TEMPO,
    tempo,
  } as const)

export const setNotes = (notes: Note[]) =>
  ({
    type: SET_NOTES,
    notes,
  } as const)

export type Action = ReturnType<typeof setTempo | typeof setNotes>

// operations

const stepToOffest = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]

export const loadMusicXmlScore = (
  musicXml: File,
): ThunkAction<Promise<void>, RootState, unknown, Action> => async (
  dispatch,
  _,
) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(await musicXml.text(), 'application/xml')
  const tempo = doc.querySelector('sound[tempo]')

  if (tempo === null) {
    throw new Error('failed to find tempo info')
  }

  dispatch(setTempo(parseInt(tempo.getAttribute('tempo') ?? '120')))

  // load notes
  const noteElements = Array.from(doc.getElementsByTagName('note'))
  const notes: Note[] = []
  let currentPosition = 0
  let lastTied = false

  noteElements.forEach(el => {
    const rest = el.querySelector('rest')
    const length = parseFloat(el.querySelector('duration')!.innerHTML) / 4.0
    if (rest) {
      currentPosition += length
      return
    }

    const step = el.querySelector('pitch > step')!.innerHTML
    const octave = parseInt(el.querySelector('pitch > octave')!.innerHTML)
    const alter = parseInt(el.querySelector('pitch > alter')?.innerHTML ?? '0')

    const lyrics = el.querySelector('lyric > text')?.innerHTML

    const tiedEnd = el.querySelector('tie[type="stop"]') !== null

    if (lastTied && tiedEnd) {
      lastTied = false
      currentPosition += length

      notes[notes.length - 1].length += length
      return
    }

    lastTied = el.querySelector('tie[type="start"]') !== null

    const noteNumber = octave * 12 + alter + stepToOffest.indexOf(step)

    notes.push({
      position: currentPosition,
      length: length,
      noteNumber,
      lyrics,
    })

    currentPosition += length
  })

  dispatch(setNotes(notes))
}

// reducer

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TEMPO: {
      const { tempo } = action
      return { ...state, tempo }
    }
    case SET_NOTES: {
      const {  notes } = action
      return { ...state, notes }
    }
    // break
    default:
      break
  }

  return state
}

export default reducer

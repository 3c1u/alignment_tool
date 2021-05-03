import * as React from 'react'
import styled from 'styled-components'
import './App.css'
import { NoteView } from './components/NoteView'
import { PianoRoll } from './components/PianoRoll'
import { ScaleControl } from './components/ScaleControl'
import { useDispatch } from './store'
import * as score from './modules/score'
import * as label from './modules/label'

const AlignmentViewer = styled.div`
  display: flex;
  width: 100vw;
  overflow: scroll;
  overscroll-behavior-x: none;
`

const cancelEvent = (event: React.DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

export const App = () => {
  const dispatch = useDispatch()

  const handleDrop = (event: React.DragEvent) => {
    cancelEvent(event)

    const file = event.dataTransfer.files[0]
    if (file.name.endsWith('.xml')) {
      dispatch(score.loadMusicXmlScore(file))
    } else if (file.name.endsWith('.lab')) {
      dispatch(label.loadLabels(file))
    } else if (file.name.endsWith('.csv')) {
      alert('Combined Mono Label')
    }
  }

  return (
    <>
      <div
        onDragEnter={cancelEvent}
        onDragOver={cancelEvent}
        onDrop={handleDrop}
      >
        <AlignmentViewer>
          <PianoRoll />
          <NoteView />
        </AlignmentViewer>
      </div>
      <ScaleControl />
    </>
  )
}

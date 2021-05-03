import * as React from 'react'
import { useSelector } from '../store'
import styled, { css } from 'styled-components'

const NoteContainer = styled.div`
  position: relative;
`

const NoteBox = styled.div.attrs<{
  noteNumber: number
  position: number
  length: number
}>(props => ({
  style: {
    top: `${(83 - props.noteNumber) * 1}rem`,
    left: `${props.position}px`,
    width: `${props.length}px`,
  },
}))<{
  noteNumber: number
  position: number
  length: number
}>`
  position: absolute;
  height: calc(1rem - 2px);
  background: #937fda;
  border: 1px solid #574a83;
`

const SubGrid = styled.div.attrs<{ position: number }>(props => ({
  style: {
    left: props.position + 'px',
  },
}))<{ position: number }>`
  position: absolute;
  top: 0;
  width: 0px;
  height: 100%;
  border-left: 1px dotted #eeeafc;
`

const Grid = styled.div.attrs<{ position: number; emphasis: boolean }>(
  props => ({
    style: {
      left: props.position + 'px',
      backgroundColor: props.emphasis ? '#a593d6' : '#d3cee0',
    },
  }),
)<{ position: number; emphasis: boolean }>`
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
`

const LabelAlignment = styled.div.attrs<{ position: number }>(props => ({
  style: {
    left: props.position + 'px',
  },
}))<{ position: number }>`
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: #2384f3;
  font-size: 0.8em;
  color: #2384f3;
`

const InlineLyrics = styled.div`
  position: absolute;
  top: -1.3em;
  font-family: 'Helvetica Neue';
  font-size: 0.8em;
  color: #81858f;
`

const GridNumber = styled.div`
  position: absolute;
  left: 0.5em;
  font-family: 'Helvetica Neue';
  font-size: 0.8em;
  color: #81858f;
`

export const NoteView: React.FC = () => {
  const scale = useSelector(state => state.ui.scale)
  const notes = useSelector(state => state.score.notes)
  const tempo = useSelector(state => state.score.tempo)
  const labels = useSelector(state => state.label.labels)
  const delay = useSelector(state => state.label.delay) / 1000

  const posPerSecond = tempo / 60

  return (
    <NoteContainer>
      {Array.from(Array(500), (_, i) => (
        <React.Fragment key={i}>
          <Grid position={i * scale} emphasis={i % 4 === 0}>
            {i % 4 === 0 ? <GridNumber>{i}</GridNumber> : <></>}
          </Grid>
          <SubGrid position={scale * (i + 0.25)} />
          <SubGrid position={scale * (i + 0.5)} />
          <SubGrid position={scale * (i + 0.75)} />
        </React.Fragment>
      ))}
      {notes.map((n, i) => (
        <NoteBox
          key={i}
          position={n.position * scale}
          length={n.length * scale}
          noteNumber={n.noteNumber}
        >
          <InlineLyrics>{n.lyrics ?? ''}</InlineLyrics>
        </NoteBox>
      ))}
      {labels.map((n, i) => (
        <LabelAlignment key={i} position={(n.position - delay) * posPerSecond * scale}>
          {n.phoneme}
        </LabelAlignment>
      ))}
    </NoteContainer>
  )
}

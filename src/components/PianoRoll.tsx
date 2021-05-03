import * as React from 'react'
import styled from 'styled-components'

interface PianoRollOctaveRepresentationProps {
  crippled?: boolean
  octave: number
}

const PianoRollGroup = styled.div`
  position: sticky;
  left: 0;
  border-right: 1px solid #caced3;
  border-bottom: 1px solid #9aa0a7;
  background: white;
  z-index: 10;
  overflow: hidden;
  width: 40px;
  box-shadow: 6px 0 10px rgba(116, 121, 126, 0.1),
    10px 0 12px rgba(50, 52, 54, 0.05);
`

const PianoKeyStack = styled.div`
  position: relative;
`

const PianoWhiteKey = styled.div`
  height: 1rem;
  background-color: white;
  border-top: 1px solid #9aa0a7;
  color: #a0a0a8;
  font-size: 0.3em;
  text-align: right;
`

const PianoBlackKey = styled(PianoWhiteKey)`
  background-color: #424246;
`

const PianoRollOctaveRepresentation: React.FC<PianoRollOctaveRepresentationProps> = ({
  crippled,
  octave,
}) => {
  return (
    <PianoKeyStack>
      {crippled ? (
        <></>
      ) : (
        <>
          <PianoWhiteKey title={`B${octave}`} />
          <PianoBlackKey title={`A#${octave}`} />
          <PianoWhiteKey title={`A${octave}`} />
        </>
      )}
      <PianoBlackKey title={`G#${octave}`} />
      <PianoWhiteKey title={`G${octave}`} />
      <PianoBlackKey title={`F#${octave}`} />
      <PianoWhiteKey title={`F${octave}`} />
      <PianoWhiteKey title={`E${octave}`} />
      <PianoBlackKey title={`D#${octave}`} />
      <PianoWhiteKey title={`D${octave}`} />
      <PianoBlackKey title={`C#${octave}`} />
      <PianoWhiteKey>{`C${octave}`}</PianoWhiteKey>
    </PianoKeyStack>
  )
}

export const PianoRoll: React.FC = () => {
  return (
    <PianoRollGroup>
      {Array.from(Array(6), (_, i) => (
        <PianoRollOctaveRepresentation
          key={i}
          octave={5 - i}
          // crippled={i == 0}
        />
      ))}
    </PianoRollGroup>
  )
}

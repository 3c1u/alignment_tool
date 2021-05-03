import * as React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from '../store'
import * as ui from '../modules/ui'
import * as score from '../modules/score'
import * as label from '../modules/label'

const ControlButton = styled.button`
  appearance: none;
  background: #5398ff;
  border: none;
  font-size: 1rem;
  margin: 4px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:not(:disabled) {
    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }
`
const TempoInputSection = styled.div`
  margin-right: 16px;
`

const TempoField = styled.input`
  appearance: none;
  background: #ffffff;
  border: none;
  font-size: 0.8rem;
  margin: 4px;
  padding: 4px;
  border-radius: 5px;
  width: 60px;
  cursor: pointer;
`

const ScaleControlCell = styled.div`
  position: fixed;
  display: flex;
  bottom: 24px;
  right: 24px;
  background: #f5f7fa;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(10, 20, 50, 0.2), 0 10px 12px rgba(10, 10, 30, 0.1);
`

export const ScaleControl: React.FC = () => {
  const dispatch = useDispatch()
  const tempo = useSelector(state => state.score.tempo)
  const delay = useSelector(state => state.label.delay)

  return (
    <ScaleControlCell>
      <TempoInputSection>
        ♩=
        <TempoField
          type="number"
          value={tempo}
          onChange={event =>
            dispatch(score.setTempo(parseInt(event.target.value)))
          }
        />
      </TempoInputSection>
      <TempoInputSection>
        Delay
        <TempoField
          type="number"
          value={delay}
          onChange={event =>
            dispatch(label.setDelay(parseInt(event.target.value)))
          }
        />
      </TempoInputSection>
      <ControlButton onClick={() => dispatch(ui.plusScale(5))}>+</ControlButton>
      <ControlButton onClick={() => dispatch(ui.plusScale(-5))}>
        -
      </ControlButton>
    </ScaleControlCell>
  )
}

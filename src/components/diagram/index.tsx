import { useState, useEffect, useReducer } from "react"
import styled from "styled-components"
import { Slider } from "../slider"
import { Pour } from "./_pour"

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  min-width: 700px;
  margin: 32px auto;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
`

const FirstFourty = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;

  & > *:first-of-type {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`

const LastSixty = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  & > *:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`

export type PourDiagramProps = {
  amountPerPour: number
}

function init(amountPerPour: number) {
  return {
    0: amountPerPour,
    1: amountPerPour
  }
}

type Action =
  | {
      type: "UPDATE_POUR"
      updates: Array<number>
    }
  | { type: "RESET"; amount: number }

export const PourDiagram: React.FC<PourDiagramProps> = ({ amountPerPour }) => {
  const [ASRatioValue, setASRatioValue] = useState("")
  const [strengthValue, setStrengthValue] = useState("0")
  const [pours, setPours] = useReducer(
    (prev: Record<number, number>, action: Action) => {
      switch (action.type) {
        case "UPDATE_POUR":
          return {
            ...prev,
            ...action.updates.reduce((acc, next, idx) => {
              acc[idx] = amountPerPour + next
              return acc
            }, {} as Record<number, number>)
          }
        case "RESET":
          return init(action.amount)
        default:
          throw new Error(`Reducer called with invalid action.`)
      }
    },
    init(amountPerPour)
  )

  useEffect(() => {
    setPours({ type: "RESET", amount: amountPerPour })
    setASRatioValue("")
    setStrengthValue("0")
  }, [amountPerPour])

  useEffect(() => {
    const value = Number(ASRatioValue)
    setPours({ type: "UPDATE_POUR", updates: [value, -1 * value] })
  }, [ASRatioValue])

  const renderLastSixty = () => {
    const total = amountPerPour * 3
    switch (strengthValue) {
      case "-1":
        return (
          <>
            <Pour value={total / 2} number={2}>
              {total / 2} ml
            </Pour>
            <Pour value={total / 2} number={3}>
              {total / 2} ml
            </Pour>
          </>
        )
      case "0":
        return (
          <>
            <Pour value={total / 3} number={2}>
              {total / 3} ml
            </Pour>
            <Pour value={total / 3} number={3}>
              {total / 3} ml
            </Pour>
            <Pour value={total / 3} number={4}>
              {total / 3} ml
            </Pour>
          </>
        )
      case "1":
        return (
          <>
            <Pour value={total / 4} number={2}>
              {total / 4} ml
            </Pour>
            <Pour value={total / 4} number={3}>
              {total / 4} ml
            </Pour>
            <Pour value={total / 4} number={4}>
              {total / 4} ml
            </Pour>
            <Pour value={total / 4} number={5}>
              {total / 4} ml
            </Pour>
          </>
        )
      default:
        return null
    }
  }

  const getPourProps = (n: 0 | 1) => {
    const value = pours[n] / amountPerPour
    return {
      children: `${pours[n]} ml`,
      value,
      number: n
    }
  }

  return (
    <div style={{ overflow: "auto" }}>
      <Wrapper>
        <FirstFourty>
          <Pour {...getPourProps(0)} />
          <Pour {...getPourProps(1)} />
        </FirstFourty>
        <LastSixty>{renderLastSixty()}</LastSixty>
      </Wrapper>
      <Slider
        labelStart="Sweetness"
        labelEnd="Acidity"
        value={ASRatioValue}
        onChange={(e) => setASRatioValue(e.target.value)}
        min={-1 * amountPerPour}
        max={amountPerPour}
      />
      <Slider
        labelStart="Weaker"
        labelEnd="Stronger"
        value={strengthValue}
        onChange={(e) => setStrengthValue(e.target.value)}
        min={-1}
        max={1}
      />
    </div>
  )
}

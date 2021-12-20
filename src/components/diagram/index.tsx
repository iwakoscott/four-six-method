import styled from "styled-components"
import { useConfiguration } from "../../hooks"
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

export const PourDiagram: React.FC = () => {
  const {
    adjustedPourAmounts,
    strengthValue,
    ASRatioValue,
    setStrengthValue,
    setASRatioValue,
    defaultAmountPerPour
  } = useConfiguration()
  const renderLastSixty = () => {
    switch (strengthValue) {
      case "-1":
        return (
          <>
            <Pour value={adjustedPourAmounts[2]} number={2}>
              {adjustedPourAmounts[2]} ml
            </Pour>
            <Pour value={adjustedPourAmounts[3]} number={3}>
              {adjustedPourAmounts[3]} ml
            </Pour>
          </>
        )
      case "0":
        return (
          <>
            <Pour value={adjustedPourAmounts[2]} number={2}>
              {adjustedPourAmounts[2]} ml
            </Pour>
            <Pour value={adjustedPourAmounts[3]} number={3}>
              {adjustedPourAmounts[3]} ml
            </Pour>
            <Pour value={adjustedPourAmounts[4]} number={4}>
              {adjustedPourAmounts[4]} ml
            </Pour>
          </>
        )
      case "1":
        return (
          <>
            <Pour value={adjustedPourAmounts[2]} number={2}>
              {adjustedPourAmounts[2]} ml
            </Pour>
            <Pour value={adjustedPourAmounts[3]} number={3}>
              {adjustedPourAmounts[3]} ml
            </Pour>
            <Pour value={adjustedPourAmounts[4]} number={4}>
              {adjustedPourAmounts[4]} ml
            </Pour>
            <Pour value={adjustedPourAmounts[5]} number={5}>
              {adjustedPourAmounts[5]} ml
            </Pour>
          </>
        )
      default:
        return null
    }
  }

  const getPourProps = (n: 0 | 1) => {
    const value = adjustedPourAmounts[n] / defaultAmountPerPour
    return {
      children: `${adjustedPourAmounts[n]} ml`,
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
        min={-1 * defaultAmountPerPour}
        max={defaultAmountPerPour}
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

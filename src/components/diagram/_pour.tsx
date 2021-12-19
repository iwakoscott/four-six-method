import { useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div.attrs<{
  flex: number
  idx: number
}>((props) => ({
  style: {
    flex: props.flex,
    backgroundColor:
      props.flex > 0
        ? `hsl(200.5, 100%, 50%, ${(6 - props.idx) / 6})`
        : "hsl(228, 7.7%, 87.3%)"
  }
}))<{ flex: number; idx: number }>`
  display: flex;
  justify-content: center;
  padding: 32px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  position: relative;
  transition: background-color 400ms linear;
`

const ToolTip = styled.p.attrs<{ show: boolean }>((props) => ({
  show: props.show
}))<{ show: boolean }>`
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: -35px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;
  &::before {
    content: "";
    border-top: 1px solid black;
    flex: 1;
  }

  &::after {
    content: "";
    border-top: 1px solid black;
    flex: 1;
  }
`

const humanReadable = (number: number) => {
  const floor = Math.floor(number / 100) * 100
  const value = number - floor
  switch (value) {
    case 1:
      return (
        <span>
          {number}
          <sup>st</sup>
        </span>
      )
    case 2:
      return (
        <span>
          {number}
          <sup>nd</sup>
        </span>
      )
    case 3:
      return (
        <span>
          {number}
          <sup>rd</sup>
        </span>
      )
    case 0:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return (
        <span>
          {number}
          <sup>th</sup>
        </span>
      )
    default:
      return ""
  }
}

export const Pour: React.FC<{
  value: number
  number: number
}> = ({ children, value, number, ...rest }) => {
  const [show, setShow] = useState(false)
  const hover = (e: any) => {
    setShow(true)
  }
  const mouseOut = (e: any) => {
    setShow(false)
  }

  return (
    <Wrapper
      onMouseOut={mouseOut}
      onMouseOver={hover}
      idx={number}
      flex={value}
    >
      <ToolTip show={show}>{humanReadable(number + 1)} Pour</ToolTip>
      {children}
    </Wrapper>
  )
}

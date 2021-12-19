import styled from "styled-components"

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`

type SliderProps = {
  labelStart: string
  labelEnd: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Slider: React.FC<SliderProps> = ({
  labelStart,
  labelEnd,
  ...rest
}) => {
  return (
    <Wrapper>
      <span>{labelStart}</span>
      <div>
        <input style={{ width: "100%" }} type="range" {...rest} />
      </div>
      <span>{labelEnd}</span>
    </Wrapper>
  )
}

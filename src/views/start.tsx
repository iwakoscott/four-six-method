import { FC } from "react"
import { RouteProps } from "react-router-dom"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { PourDiagram } from "../components"

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  h1 {
    text-align: center;
  }
`

const Label = styled.label`
  display: flex;
  gap: 16px;
  align-items: center;
`

const Row = styled.div`
  display: flex;
`

const Output = styled.output`
  display: block;
  margin-top: 16px;
`

const SubmitButton = styled.button`
  border: none;
  border-radius: 4px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`

export const StartView: FC<RouteProps> = () => {
  const [coffeeGrams, setCoffeeGrams] = useState("20")
  const [amountPerPour, setAmountPerPour] = useState<number>()

  useEffect(() => {
    if (coffeeGrams !== "") {
      const amount = Number(coffeeGrams) * 3
      setAmountPerPour(amount)
    } else {
      setAmountPerPour(undefined)
    }
  }, [coffeeGrams])

  const submit = (e: any) => {
    e.preventDefault()
    const { coffee } = e.target.elements
    setCoffeeGrams(coffee.value)
  }

  return (
    <Wrapper>
      <h1>Kasuya's 4:6 Pour-over Method</h1>
      <form onSubmit={submit}>
        <Row>
          <Label>
            <span>Coffee in grams</span>
            <input
              defaultValue={20}
              name="coffee"
              type="number"
              min={13}
              max={30}
            />
          </Label>
          <SubmitButton type="submit">Start</SubmitButton>
        </Row>
        {amountPerPour && (
          <div>
            <Output>
              {amountPerPour} ml per pour, {amountPerPour * 5} ml of water in
              total
            </Output>
            <PourDiagram amountPerPour={amountPerPour} />
          </div>
        )}
      </form>
    </Wrapper>
  )
}

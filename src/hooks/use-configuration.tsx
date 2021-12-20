import {
  createContext,
  FC,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react"

type IConfigurationContext = {
  ASRatioValue: string
  strengthValue: string
  coffeeGrams: string
  defaultAmountPerPour: number
  setCoffeeGrams: React.Dispatch<React.SetStateAction<string>>
  setASRatioValue: React.Dispatch<React.SetStateAction<string>>
  setStrengthValue: React.Dispatch<React.SetStateAction<string>>
  adjustedPourAmounts: Record<number, number>
}

const ConfigurationContext = createContext<IConfigurationContext>(
  undefined as any
)

function init(amountPerPour: number) {
  return {
    0: amountPerPour,
    1: amountPerPour,
    2: amountPerPour,
    3: amountPerPour,
    4: amountPerPour,
    5: 0
  }
}

type Action =
  | {
      type: "ADD_TO_POUR"
      updates: Array<number>
    }
  | { type: "RESET"; amount: number }
  | { type: "UPDATE_POUR"; updates: Array<number | undefined> }

export const ConfigurationContextProvider: FC = ({ children }) => {
  const [coffeeGrams, setCoffeeGrams] = useState("20")
  const [defaultAmountPerPour, setDefaultAmountPerPour] = useState<number>(
    Number(coffeeGrams) * 3
  )
  const [ASRatioValue, setASRatioValue] = useState("")
  const [strengthValue, setStrengthValue] = useState("0")
  const [adjustedPourAmounts, dispatch] = useReducer(
    (prev: Record<number, number>, action: Action) => {
      switch (action.type) {
        case "UPDATE_POUR":
          return {
            ...prev,
            ...action.updates.reduce((acc, next, idx) => {
              if (typeof next !== "undefined") {
                acc[idx] = next
              }
              return acc
            }, {} as Record<number, number>)
          }
        case "ADD_TO_POUR":
          return {
            ...prev,
            ...action.updates.reduce((acc, next, idx) => {
              acc[idx] = defaultAmountPerPour + next
              return acc
            }, {} as Record<number, number>)
          }
        case "RESET":
          return init(action.amount)
        default:
          throw new Error(`Reducer called with invalid action.`)
      }
    },
    init(defaultAmountPerPour)
  )

  useEffect(() => {
    if (coffeeGrams !== "") {
      const amount = Number(coffeeGrams) * 3
      setDefaultAmountPerPour(amount)
    }
  }, [coffeeGrams])

  useEffect(() => {
    dispatch({ type: "RESET", amount: defaultAmountPerPour })
    setASRatioValue("")
    setStrengthValue("0")
  }, [defaultAmountPerPour])

  useEffect(() => {
    const value = Number(ASRatioValue)
    dispatch({ type: "ADD_TO_POUR", updates: [value, -1 * value] })
  }, [ASRatioValue])

  useEffect(() => {
    const total = defaultAmountPerPour * 3
    switch (strengthValue) {
      case "-1":
        dispatch({
          type: "UPDATE_POUR",
          updates: [undefined, undefined, total / 2, total / 2]
        })
        break
      case "0":
        dispatch({
          type: "UPDATE_POUR",
          updates: [
            undefined,
            undefined,
            defaultAmountPerPour,
            defaultAmountPerPour,
            defaultAmountPerPour
          ]
        })
        break
      case "1":
        dispatch({
          type: "UPDATE_POUR",
          updates: [
            undefined,
            undefined,
            total / 4,
            total / 4,
            total / 4,
            total / 4
          ]
        })
        break
      default:
        return
    }
  }, [strengthValue, defaultAmountPerPour])
  return (
    <ConfigurationContext.Provider
      value={{
        ASRatioValue,
        strengthValue,
        coffeeGrams,
        setCoffeeGrams,
        adjustedPourAmounts,
        defaultAmountPerPour,
        setStrengthValue,
        setASRatioValue
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  )
}

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext)
  if (!context)
    throw new Error(
      `You are trying to call useConfiguration outside of its provider.`
    )
  return context
}

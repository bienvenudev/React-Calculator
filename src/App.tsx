import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'clear',
  NEGATE: 'negate',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) { // 1.explain why type and payload? where does it come from? isn't it part of state too?
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        if (payload.digit === '.') {
          return {
            ...state,
            currentOperand: "0.",
            overwrite: false
          }
        }

        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      if (payload.digit === '.' && state.currentOperand == null) {
        return state
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      }

      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand) {
        if (state.currentOperand.endsWith(".")) return state
      }

      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null
      }

    case ACTIONS.EVALUATE:
      if (state.previousOperand == null || state.currentOperand == null || state.operation == null) return state
      if (state.currentOperand.endsWith(".")) return state

      return {
        ...state,
        operation: payload.operation,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null
      }

    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "0", //2. spread state first, here i wanted to add that if AC is clicked then current should be 0 but suspect it'll cause issues elsewhere (talk about this, I was passing "0" but then i changed to number now it's working) -- (edit: fixed now because the integer formatter removes trailing zeros)
        previousOperand: null,
        operation: null
      }

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand.split('').slice(0, state.currentOperand.split('').length - 1).join('')}`
      }

    case ACTIONS.NEGATE:
      if (state.currentOperand == null || state.currentOperand == "0") return state;

      if (!state.currentOperand.includes('-')) {
        console.log('No negative detected!')
        return {
          ...state,
          negateVal: true,
          currentOperand: `-${state.currentOperand}`,
        }
      }

      if (state.currentOperand.includes('-')) {
        console.log('Negative detected now make it positive')
        return {
          ...state,
          negateVal: false,
          currentOperand: `${state.currentOperand.split('-')[1]}`
        }
      }
  }
}

function evaluate({ previousOperand, currentOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if (prev == null || current == null || operation == null) return state

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", { // 3. is there something I can do to make it like normal calculations, like handle big numbers (i suspect adding . and +e as i saw on another calculator -- explain extensively)
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(operand)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: "0" })

  return (
    <main className="max-w-95 mx-auto min-h-[100vh] pt-40">
      <div className="shadow-2xl">
        <section className="bg-[#7a7b88]">
          <div className="text-2xl p-2 flex justify-end min-h-7">
            {formatOperand(previousOperand)}{operation}
          </div>
          <div className="text-4xl p-2 flex justify-end min-h-14">
            {formatOperand(currentOperand)}
          </div>
        </section>

        <section className="grid grid-rows-5 grid-cols-4">
          <button
            onClick={() => dispatch({ type: ACTIONS.CLEAR, payload: {} })}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            AC
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.NEGATE, payload: {} })}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            +/-
          </button>
          <button
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            %
          </button>
          <OperationButton dispatch={dispatch} operation="÷" />
          <DigitButton dispatch={dispatch} digit="7" />
          <DigitButton dispatch={dispatch} digit="8" />
          <DigitButton dispatch={dispatch} digit="9" />
          <OperationButton dispatch={dispatch} operation="*" />
          <DigitButton dispatch={dispatch} digit="4" />
          <DigitButton dispatch={dispatch} digit="5" />
          <DigitButton dispatch={dispatch} digit="6" />
          <OperationButton dispatch={dispatch} operation="-" />
          <DigitButton dispatch={dispatch} digit="1" />
          <DigitButton dispatch={dispatch} digit="2" />
          <DigitButton dispatch={dispatch} digit="3" />
          <OperationButton dispatch={dispatch} operation="+" />
          <DigitButton dispatch={dispatch} digit="0" />
          <DigitButton dispatch={dispatch} digit="." />
          <button
            onClick={() => dispatch({ type: ACTIONS.EVALUATE, payload: {} })}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer "
          >
            =
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT, payload: {} })}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer "
          >
            DEL
          </button>
        </section>
      </div>
    </main>
  );
}

export default App;

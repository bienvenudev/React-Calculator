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
} as const;

interface CalculatorState {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite?: boolean;
}

interface AddDigitAction {
  type: typeof ACTIONS.ADD_DIGIT;
  payload: { digit: string };
}

interface ChooseOperationAction {
  type: typeof ACTIONS.CHOOSE_OPERATION;
  payload: { operation: string };
}

interface EvaluateAction {
  type: typeof ACTIONS.EVALUATE;
  payload?: undefined;
}

interface ClearAction {
  type: typeof ACTIONS.CLEAR;
  payload?: undefined;
}

interface DeleteDigitAction {
  type: typeof ACTIONS.DELETE_DIGIT;
  payload?: undefined;
}

interface NegateAction {
  type: typeof ACTIONS.NEGATE;
  payload?: undefined;
}

export type CalculatorAction =
  | AddDigitAction
  | ChooseOperationAction
  | EvaluateAction
  | ClearAction
  | DeleteDigitAction
  | NegateAction

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  const { type, payload } = action;
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
      if (payload.digit === '.' && state.currentOperand?.includes('.')) {
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
        operation: null,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null
      }

    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "0",
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
        currentOperand: `${state.currentOperand.split('').slice(0, -1).join('')}`
      }

    case ACTIONS.NEGATE:
      if (state.currentOperand == null || state.currentOperand == "0") return state;

      if (!state.currentOperand.includes('-')) {
        return {
          ...state,
          currentOperand: `-${state.currentOperand}`,
        }
      }

      if (state.currentOperand.includes('-')) {
        return {
          ...state,
          currentOperand: `${state.currentOperand.split('-')[1]}`
        }
      }
  }
  return state;
}

function evaluate({ previousOperand, currentOperand, operation }: {
  previousOperand: string | null;
  currentOperand: string | null;
  operation: string | null;
}): string {
  if (!previousOperand || !currentOperand || !operation) return ""

  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return ""

  let computation = 0;

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
      break;
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
  // notation: "compact",
  // compactDisplay: "long"
})

function formatOperand(operand: string | null): string | undefined {
  if (operand == null) return

  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseInt(integer));
  return `${INTEGER_FORMATTER.format(parseInt(operand))}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: "0", previousOperand: null, operation: null })

  return (
    <main className="max-w-95 mx-auto min-h-[100vh] pt-40">
      <div className="shadow-2xl">
        <section className="bg-[#7a7b88]">
          <div className="text-2xl p-2 flex justify-end min-h-7 opacity-80">
            {formatOperand(previousOperand)}{operation}
          </div>
          <div className="text-4xl p-2 flex justify-end min-h-14">
            {formatOperand(currentOperand)}
          </div>
        </section>

        <section className="grid grid-rows-5 grid-cols-4">
          <button
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            AC
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.NEGATE })}
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
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer "
          >
            =
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
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

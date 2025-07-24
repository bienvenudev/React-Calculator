import { ACTIONS, type CalculatorAction } from "./App"

interface OperationButtonProps {
  dispatch: React.Dispatch<CalculatorAction>;
  operation: string;
}

export default function OperationButton({ dispatch, operation }: OperationButtonProps) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
      className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer 
"
    >
      {operation}
    </button>
  )
}
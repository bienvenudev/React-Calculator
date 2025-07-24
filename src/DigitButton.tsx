import { ACTIONS } from "./App"

export default function DigitButton({ dispatch, digit }) {

  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      className={`h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] active:bg-[#b4b2b2]`}
    >
      {digit}
    </button>
  )
}
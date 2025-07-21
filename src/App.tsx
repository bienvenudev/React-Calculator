import { useState } from "react";

function App() {
  // ✅ get clicked buttons values x
  // ✅ keep track of clicked buttons values
  // ✅ render clicked buttons values in real time
  // ✅ eval when = is clicked
  // state for result
  // update result state when = is clicked

  /*
  Current number being entered?
  Previous result?
  Pending operation?
  Calculator state?
  */
  
  // starting with operator not allowed (- is exception)
  // prevOperation should not be same operation (operation replacement), 
  // . might need different state
  // 

  const [clickedButton, setClickedButton] = useState('');

  
  function handleClick(e:React.MouseEvent<HTMLButtonElement>) {
    const clickedBtn = (e.target as HTMLButtonElement).innerText; // what about here
    if (clickedBtn === '=') {
      try {
        const currentResult = eval(clickedButton)
        setClickedButton(currentResult)
      } catch (error) { // and here
        console.error(error)
        setClickedButton('Error')
      }

    } else {
      // const lastAction = [clickedButton[clickedButton.length - 1]];
      // if ((lastAction == '+' && clickedBtn == '+')
      //   || lastAction == '-' && clickedBtn == '-'
      //   || lastAction == '*' && clickedBtn == '*'
      //   || lastAction == '/' && clickedBtn == '/') console.log('same operation twice')
      if (clickedBtn === 'AC') {
        setClickedButton('');
      } else 
      setClickedButton((prev) => prev += clickedBtn);
    }
  }

  

  return (
    <main className="max-w-95 mx-auto min-h-[100vh] pt-40">
      <div className="shadow-2xl">
        <section className="bg-[#7a7b88]">
          <div className="text-4xl p-2 flex justify-end min-h-14">
            {/* {equals ? currentResult : clickedButton} */}
            { clickedButton }
            {/* { currentResult } */}
          </div>
        </section>

        <section className="grid grid-rows-5 grid-cols-4">
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            AC
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            +/-
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            %
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer 
"
          >
            /
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            7
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            8
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            9
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer"
          >
            *
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            4
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            5
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            6
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer  
        "
          >
            -
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            1
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            2
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            3
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer"
          >
            +
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer col-span-2 hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            0
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#dbdbdb] text-black font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer hover:bg-[#c4c2c2] 
        active:bg-[#b4b2b2]"
          >
            .
          </button>
          <button
            onClick={handleClick}
            className="h-14 bg-[#f38636] text-white hover:bg-[#c77337] active:bg-[#a55e2b] font-bold uppercase text-2xl border-1 border-[#7a7b88] cursor-pointer "
          >
            =
          </button>
        </section>
      </div>
    </main>
  );
}

export default App;

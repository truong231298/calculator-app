import React from "react"
import { useState } from "react"

const App = () => {
  const themes = [
    { id: 1, name: "1", backgroundColor: { mainBackground: "hsl(222, 26%, 31%)", toggleBackground: "hsl(223, 31%, 20%)", screenBackground: "hsl(224, 36%, 15%)" }, Keys: { keyBackground1: "hsl(225, 21%, 49%)", keyShadow1: "hsl(224, 28%, 35%)", keyBackground2: "hsl(6, 63%, 50%)", keyShadow2: "hsl(6, 70%, 34%)", keyBackground3: "hsl(30, 25%, 89%)", keyShadow3: "hsl(28, 16%, 65%)" }, text: { type1: "hsl(221, 14%, 31%)", type2: "hsl(0, 0%, 100%)" } },
    { id: 2, name: "2", backgroundColor: { mainBackground: "hsl(0, 0%, 90%)", toggleBackground: "hsl(0, 5%, 81%)", screenBackground: "hsl(0, 0%, 93%)" }, Keys: { keyBackground1: "hsl(185, 42%, 37%)", keyShadow1: "hsl(185, 58%, 25%)", keyBackground2: "hsl(25, 98%, 40%)", keyShadow2: "hsl(25, 99%, 27%)", keyBackground3: "hsl(45, 7%, 89%)", keyShadow3: "hsl(35, 11%, 61%)" }, text: { type1: "hsl(60, 10%, 19%)", type2: "hsl(0, 0%, 100%)" } },
    { id: 3, name: "3", backgroundColor: { mainBackground: "hsl(268, 75%, 9%)", toggleBackground: "hsl(268, 71%, 12%)", screenBackground: "hsl(268, 71%, 12%)" }, Keys: { keyBackground1: "hsl(281, 89%, 26%)", keyShadow1: "hsl(285, 91%, 52%)", keyBackground2: "hsl(176, 100%, 44%)", keyShadow2: "hsl(177, 92%, 70%)", keyBackground3: "hsl(268, 47%, 21%)", keyShadow3: "hsl(290, 70%, 36%)" }, text: { type1: "hsl(52, 100%, 62%)", type2: "hsl(198, 20%, 13%)", type3:"hsl(0, 0%, 100%)" } }
  ];

  const [selectedTheme, setSelectedTheme] = useState(1);

  const handleChangeTheme = (id) => {
    setSelectedTheme(id);
  };


  // calculate
  const calculate = [
    { name: 7, value: 7 }, { name: 8, value: 8 }, { name: 9, value: 9 }, { name: "DEL", value: "DEL" },
    { name: 4, value: 4 }, { name: 5, value: 5 }, { name: 6, value: 6 }, { name: "+", value: "+" },
    { name: 1, value: 1 }, { name: 2, value: 2 }, { name: 3, value: 3 }, { name: "-", value: "-" },
    { name: ".", value: "." }, { name: 0, value: "0" }, { name: "/", value: "/" }, { name: "x", value: "*" }
  ]
  const [total, setTotal] = useState("")

  const handleCalculate = (value) => {
    if (value === "=") {
      try {
        const result = evaluateExpression(total);
        setTotal(String(result));
      } catch (error) {
        setTotal("Error");
      }
    } else if (value === "DEL") {
      setTotal(prevTotal => prevTotal.slice(0, -1));
    } else if (isOperator(value)) {
      setTotal(prevTotal => prevTotal + value);
    } else {
      setTotal(prevTotal => String(prevTotal) + String(value));
    }
  };

  const isOperator = (value) => {
    return value === "+" || value === "-" || value === "*" || value === "/";
  };

  const evaluateExpression = (expression) => {
    const operators = ['+', '-', '*', '/'];
    const stack = [];
    let currentNumber = '';

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(char) || char === '.') {
        // If the character is a digit or a decimal point, append it to the current number
        currentNumber += char;
      } else if (operators.includes(char)) {
        // If the character is an operator, push the current number onto the stack and reset currentNumber
        stack.push(parseFloat(currentNumber));
        stack.push(char);
        currentNumber = '';
      }
    }

    // Push the last number onto the stack
    stack.push(parseFloat(currentNumber));

    // Perform the arithmetic operations based on operator precedence
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
      const operator = stack[i];
      const operand = stack[i + 1];

      if (operator === '+') {
        result += operand;
      } else if (operator === '-') {
        result -= operand;
      } else if (operator === '*') {
        result *= operand;
      } else if (operator === '/') {
        if (operand === 0) {
          throw new Error('Division by zero');
        }
        result /= operand;
      }
    }

    return result;
  };



  return (
    <main className="min-h-screen" style={{ backgroundColor: themes[selectedTheme - 1].backgroundColor.mainBackground }}>
      <section className='max-w-md mx-auto flex flex-col gap-2'>
        {/* part 1 */}
        <div className='flex flex-row justify-between items-center mt-24'>

          <h1 className="text-4xl font-semibold">calc</h1>
          <div className='flex flex-row gap-2'>
            <h1 className="uppercase">Theme</h1>
            {themes.map(theme => (
              <div key={theme.id} className="">
                <input
                  type="radio"
                  id={`theme${theme.id}`}
                  value={theme.id}
                  checked={selectedTheme === theme.id}
                  onChange={() => handleChangeTheme(theme.id)}
                />
                <label htmlFor={`theme${theme.id}`} className="cursor-pointer">
                  {theme.name}
                </label>
              </div>
            ))}


            <div className='switch' style={{backgroundColor: themes[selectedTheme-1].backgroundColor.toggleBackground}}>

              <span className={`${selectedTheme === 3 ? "switch-selector ml-12" : "hidden"}`}></span>
              <span className={`${selectedTheme === 2 ? "switch-selector ml-6" : "hidden"}`}></span>
              <span className={`${selectedTheme === 1 ? "switch-selector" : "hidden"}`}></span>

            </div>
          </div>
        </div>

        {/* part 2 */}
        <div className='w-full h-32 rounded-lg' style={{backgroundColor: themes[selectedTheme-1].backgroundColor.screenBackground}}>
          <p className='float-right text-6xl font-semibold mt-10 mr-4'>{total}</p>
        </div>
        {/* part 3 */}
        <div className='w-full p-4 rounded-md mt-2' style={{backgroundColor: themes[selectedTheme-1].backgroundColor.screenBackground}}>
          <div className='grid grid-cols-4 gap-4'>
            {calculate.map((id, index) => (
              <span onClick={() => handleCalculate(id.value)} key={index} className='w-16 h-16 border-2 rounded-lg flex justify-center items-center font-semibold text-xl'>
                {id.name}
              </span>
            ))}
            <button className='w-full bg-red-500 col-span-2 rounded-lg p-2' onClick={() => setTotal(0)}>RESET</button>
            <button className='w-full bg-red-500 col-span-2 rounded-lg p-2' onClick={() => handleCalculate('=')}>=</button>
          </div>

        </div>
      </section>
    </main>

  )
}

export default App
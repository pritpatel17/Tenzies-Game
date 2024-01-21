import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDie());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die=>die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!")
    }
    console.log("Dice state changed")
  },[dice])
  function allNewDie() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
  }
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }));
    } else {
      setTenzies(false)
      setDice(allNewDie)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }
  // console.log(allNewDie());
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} holdDice={() => holdDice(die.id) } />);
  return (
    <>
      <main className="main-container">
        <div  className="dice-container">
          {diceElements}
        </div>
        <button onClick={rollDice} className="roll-dice">
         {tenzies? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );    
}

export default App;

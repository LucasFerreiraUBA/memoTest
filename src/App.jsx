import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card/Card'
import { IMAGES } from './constats/constant_images'
import { createCard, shuffleArray } from './utils/createCard'
import { VOLTEADA } from './constats/constant_card'

const crearTablero = () =>{
  const duplicatedImages = [...IMAGES, ...IMAGES];
  const shuffledImages = shuffleArray(duplicatedImages)
  const cards = shuffledImages.map((card, index) => createCard(card,index));
  return cards
}

const voltearCarta = (tablero,index) => {
  let nuevoTablero = [...tablero]
  if(nuevoTablero[index].turned !== VOLTEADA){
    nuevoTablero[index].turned = VOLTEADA
  }
  return nuevoTablero
}

const hayMatch = (board, id1, id2) => (
  board[id1].type === board[id2].type && board[id1].id !== board[id2].id
);

function App() {
  const [board, setBoard] = useState(crearTablero())
  const [flipped,setFlipped] = useState([])
  console.log();

  const updateBoard = (index) =>{  
    if(!flipped.length){
      setBoard(voltearCarta(board,index))
      setFlipped([...flipped,index])
      return
    }
    // hay un elemento volteado
    let id1 = flipped[0]
    let id2= index
    setBoard(voltearCarta(board, id2));
    setFlipped([...flipped, id2]);
    if (hayMatch(board, id1, id2)) {
      setTimeout(() => {
        setFlipped([]);
      }, 1000);
    } else {
      setTimeout(() => {
        let nuevoTablero = [...board];
        nuevoTablero[id1].turned = false;
        nuevoTablero[id2].turned = false;
        setBoard(nuevoTablero);
        setFlipped([]);
      }, 1000);
    }
  };

  // CHEQUEO SI GANO
  const hayGanador = (board) =>{
    return board.map(({turned}) => turned).every(value => value === true);
  }

  useEffect(() =>{
    if(hayGanador(board)){
      alert("GANASTE NENE")
    }
  },[board])

  return (
    <main>
      <h2>MEMO TEST</h2>
      <section className="board">
        {
          board.map((card,index)=>{
            return <Card key={index} index={index} card={card} handleClick={() => updateBoard(index)}></Card>
          })
        }
      </section>
    </main>
  )
}

export default App

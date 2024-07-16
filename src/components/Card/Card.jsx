import './Card.css'

export const Card = ({index,card,handleClick}) =>{
    let route = `/src/assets/${card.type}.png`
    let estado = card.turned
    console.log(card.turned);
    return(
        <div className={`card ${estado ? '' : 'volteada'}`} onClick={() => handleClick(index)}>
            <img src={route} alt={card.type} />
        </div>
    )
}
export const createCard = (card,index) =>{
    return (
        {
            turned: false,
            id: index,
            type:card

        }
    )
}

export const shuffleArray = (array) => {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};
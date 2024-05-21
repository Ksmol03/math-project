const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const X = randInt(-10, 11);
const Y = randInt(-10, 11);

//Create varibles placement sequence e.g.: [X, Y, Number, Number, X]
const createSequence = () => {
    const sequenceLength = randInt(3, 7);
    let sequence = [];

    //Spread numbers placement through sequence
    for (let i = 0; i < sequenceLength; i++) {
        sequence.push('Number');
    }

    //Spread variable placement function
    const placeVariable = (variable) => {
        let positionToPlaceVariable = randInt(0, sequenceLength + 1);
        if (sequence[positionToPlaceVariable] == 'Number') {
            sequence[positionToPlaceVariable] = variable;
        } else {
            placeVariable(variable);
        }
    }

    //Spread X's placement
    const amountOfXs = randInt(1, 3);
    for (let i = 0; i < amountOfXs; i++) {
        placeVariable('X');
    }

    //Spread Y's placement
    let amountOfYs;
    if (sequenceLength == 3 && amountOfXs == 2) {
        amountOfYs = 1;
    } else {
        amountOfYs = randInt(1, 3);
    }
    for (let i = 0; i < amountOfYs; i++) {
        placeVariable('Y');
    }

    return sequence;
}

//Assign values to variables positions
const assignValues = (sequence) => {
    
}
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const X = randInt(-10, 11);
const Y = randInt(-10, 11);
const useFractions = true;

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
const assignValues = (sequence) => (
    sequence.map(position => {
        if (useFractions) {
            return ({
                numerator: randInt(-10, 11),
                variable: position,
                denumerator: randInt(0, 3) != 0 ? randInt(2, 7) : 'None'
            })
        } else {
            return ({
                numerator: randInt(-10, 11),
                variable: position,
                denumerator: 'None'
            })
        }
    })
)

//Calculate sequence with values
const calculateSequence = (sequence) => {
    return sequence.reduce((sum, mathWord) => {
        let variableMultiplier;
        switch (mathWord.variable) {
            case 'X':
                variableMultiplier = X;
                break;
            case 'Y':
                variableMultiplier = Y;
                break;
            case 'Number':
                variableMultiplier = 1;
            break;
        }
        let mathWordDenumerator = mathWord.denumerator == 'None' ? 1 : mathWord.denumerator;
        return sum + mathWord.numerator * variableMultiplier / mathWordDenumerator;
    }, 0);
}


//Find equation that equals 0
let sum;
let mathEq;
let attempts = 0;
do {
    mathEq = assignValues(createSequence());
    sum = calculateSequence(mathEq);
    attempts++;
} while (sum != 0);

console.log(mathEq);
console.log('X: ', X);
console.log('Y: ', Y);
console.log(`Found in ${attempts} attempts.`);
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
const createValuesSequence = () => (
    createSequence().map(position => {
        let numeratorValue;
        do {
            numeratorValue = randInt(-10, 11);
        } while (numeratorValue == 0)
        let denumeratorValue = randInt(2, 7);
        if (useFractions && randInt(0, 3) != 0) {
            return ({
                numerator: numeratorValue,
                denumerator: denumeratorValue,
                variable: position
            })
        } else {
            return ({
                numerator: numeratorValue,
                denumerator: 'None',
                variable: position
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
const createRightValuesSequence = () => {
    let sum;
    let mathEq;
    do {
        mathEq = createValuesSequence();
        sum = calculateSequence(mathEq);
    } while (sum != 0);

    return mathEq;
}

//Split equation to left and right side
const splitedEquation = (equation) => {
    const splitIndex = randInt(1, equation.length);
    const leftSide = equation.slice(0, splitIndex);
    const rightSide = equation.slice(splitIndex).map(mathWord => ({
        ...mathWord,
        numerator: mathWord.numerator * (-1)
    }));
    return ({
        leftSide: leftSide,
        rightSide: rightSide
    });
}

//Create system of equations
const createSystemOfEquations = () => {
    const firstEquation = createRightValuesSequence();
    const secondEquation = createRightValuesSequence();
    return(
        {
            firstEquation: splitedEquation(firstEquation),
            secondEquation: splitedEquation(secondEquation),
        }
    )
}
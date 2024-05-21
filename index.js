const randomNumber = (n = 21) => Math.floor(Math.random()*n-Math.floor(n/2));

const x = randomNumber();
const y = randomNumber();

const generateEquationsSide = () => {
    const amountOfMathWords = Math.floor(Math.random()*3+1);
    let equation = [];

    //Setting the lenght of equation
    for(let i = 0; i < amountOfMathWords; i++) {
        
        //Setting numerator and choosing which varrible to use
        let variableInWord = Math.floor(Math.random()*3);
        switch (variableInWord) {
            case 0:
                equation.push({num: randomNumber(), var: 'x'});
                break;
            case 1:
                equation.push({num: randomNumber(), var: 'y'});
                break;
            case 2:
                equation.push({num: randomNumber(), var: 'none'});
                break;
        }
        
        //Setting denumerator
        if (Math.floor(Math.random()*3) == 0) {
            equation[i].dnum = Math.floor(Math.random()*8+2);
        } else {
            equation[i].dnum = 'none';
        }
    }

    return equation;
}

const calculateEquationSide = (equation) => {
    let sum = 0;
    equation.forEach(word => {
        let value;
        //Calculating value of numerator
        switch (word.var) {
            case 'x':
                value = x * word.num;
                break;
            case 'y':
                value = y * word.num;
                break;
            case 'none':
                value = word.num;
                break;
        }

        //Calculating value with denumerator
        if (word.dnum != 'none') {
            value /= word.dnum;
        }

        sum += value;
    })
    return(sum);
}

console.log('x: ', x);
console.log('y: ', y );
const generatedLeftEquation = generateEquationsSide();
console.log(generatedLeftEquation);
const calculatedLeftEquation = calculateEquationSide(generatedLeftEquation);

let generatedRightEquation;
do {
    generatedRightEquation = generateEquationsSide();
}  while (calculatedLeftEquation != calculateEquationSide(generatedRightEquation));

console.log(generatedRightEquation);
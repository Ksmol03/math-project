//Check if X and Y is answer to system of equations
const checkSystemAnswers = (equations, X, Y) => {

    //Check sum of one of equations side
    const sumEquationSide = (equationSide, X, Y) => {
        let sum = 0;
        equationSide.map(mathWord => {
            if (mathWord.denumerator == 'None') {
                if (mathWord.variable == 'X') {
                    sum += mathWord.numerator * X;
                } else if (mathWord.variable == 'Y') {
                    sum += mathWord.numerator * Y;
                } else if (mathWord.variable == 'Number') {
                    sum += mathWord.numerator;
                }
            } else {
                if (mathWord.variable == 'X') {
                    sum += mathWord.numerator * X / mathWord.denumerator;
                } else if (mathWord.variable == 'Y') {
                    sum += mathWord.numerator * Y / mathWord.denumerator;
                } else if (mathWord.variable == 'Number') {
                    sum += mathWord.numerator / mathWord.denumerator;
                }
            }
        });
        return sum;
    }

    // return sumEquationSide(equations.firstEquation.leftSide, X, Y);

    //Check all equations sides
    if (sumEquationSide(equations.firstEquation.leftSide, X, Y) == sumEquationSide(equations.firstEquation.rightSide, X, Y) && sumEquationSide(equations.secondEquation.leftSide, X, Y) == sumEquationSide(equations.secondEquation.rightSide, X, Y)) {
        return true;
    } else {
        return false;
    }
}
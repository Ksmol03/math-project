const equationDiv = document.getElementById('equation');

const systemOfEquations = createSystemOfEquations();
console.log(systemOfEquations.firstEquation);
console.log(systemOfEquations.secondEquation);
console.log('X = ', systemOfEquations.x);
console.log('Y = ', systemOfEquations.y);

const createEquaitionSide = (mathWordsArray) => {
    mathWordsArray = mathWordsArray.map(mathWord => {
        if (mathWord.variable == 'X') {
            return mathWord.numerator + 'x';
        } else if (mathWord.variable == 'Y') {
            return mathWord.numerator + 'y';
        } else {
            return mathWord.numerator;
        }
    })
    console.log(mathWordsArray);
}

createEquaitionSide(systemOfEquations.firstEquation.leftSide);

const latexCode = `
\\[
    \\left\\{
        \\begin{array}{ll}
            2 + 2 = 4 \\\\
            dx + ey = f
        \\end{array}
    \\right.
\\]`;

equationDiv.innerHTML = latexCode;
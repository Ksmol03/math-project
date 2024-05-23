const equationDiv = document.getElementById('equation');

const systemOfEquations = createSystemOfEquations();
console.log('X = ', systemOfEquations.x);
console.log('Y = ', systemOfEquations.y);

//Create result latex expression
const createEquaitionSide = (mathWordsObjectsArray) => {
    let result = '';
    mathWordsObjectsArray.map((mathWord, index) => {
        if (index == 0 && mathWord.numerator < 0) {
            result += '-';
        }
        if (index != 0 && mathWord.numerator > 0) {
            result += '+';
        } else if (index != 0 && mathWord.numerator < 0) {
            result += '-';
        }
        const absNumerator = Math.abs(mathWord.numerator);
        if (mathWord.denumerator == 'None') {
            if (mathWord.variable == 'X') {
                result += `${absNumerator}x`
            } else if (mathWord.variable == 'Y') {
                result += `${absNumerator}y`
            } else {
                result += `${absNumerator}`
            }
        } else {
            if (mathWord.variable == 'X') {
                result += `\\frac{${absNumerator}x}{${mathWord.denumerator}}`
            } else if (mathWord.variable == 'Y') {
                result += `\\frac{${absNumerator}y}{${mathWord.denumerator}}`
            } else {
                result += `\\frac{${absNumerator}}{${mathWord.denumerator}}`
            }
        }
    })
    return result;
}

const latexCode = `
\\[
    \\left\\{
        \\begin{array}{ll}
            ${createEquaitionSide(systemOfEquations.firstEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.firstEquation.rightSide)} \\\\
            ${createEquaitionSide(systemOfEquations.secondEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.secondEquation.rightSide)}
        \\end{array}
    \\right.
\\]`;

equationDiv.innerHTML = latexCode;
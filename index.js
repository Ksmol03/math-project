const equationDiv = document.getElementById('equation');
const button = document.getElementById('generate-equation-button');

//Create result latex expression
const createEquaitionSide = (mathWordsObjectsArray) => {
    let result = '';
    mathWordsObjectsArray.map((mathWord, index) => {

        //Adding + or - between math words
        if (index == 0 && mathWord.numerator < 0) {
            result += '-';
        }
        if (index != 0 && mathWord.numerator > 0) {
            result += '+';
        } else if (index != 0 && mathWord.numerator < 0) {
            result += '-';
        }
        let absNumerator = Math.abs(mathWord.numerator);
        
        //Change fractions like 3/3 to 1
        

        //Remove "1" in front of variable
        if (absNumerator == 1 && mathWord.denumerator == 'None' && mathWord.variable != 'Number') {
            absNumerator = '';
        }

        if (mathWord.denumerator == 'None') {
            if (mathWord.variable == 'X') {
                result += `${absNumerator}x`
            } else if (mathWord.variable == 'Y') {
                result += `${absNumerator}y`
            } else {
                result += `${absNumerator}`
            }
        } else {

            //Adding fractions to result
            if (mathWord.variable == 'X') {
                result += `\\frac{${absNumerator}}{${mathWord.denumerator}}x`
            } else if (mathWord.variable == 'Y') {
                result += `\\frac{${absNumerator}}{${mathWord.denumerator}}y`
            } else {
                result += `\\frac{${absNumerator}}{${mathWord.denumerator}}`
            }
        }
    })
    return result;
}

let systemOfEquations = createSystemOfEquations();

    let latexCode = `
    \\[
        \\left\\{
            \\begin{array}{ll}
                ${createEquaitionSide(systemOfEquations.firstEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.firstEquation.rightSide)} \\\\ \\\\
                ${createEquaitionSide(systemOfEquations.secondEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.secondEquation.rightSide)}
            \\end{array}
        \\right.
    \\]`;

    equationDiv.innerHTML = latexCode;

    renderMathInElement(equationDiv, {
        delimiters: [
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false}
          ]
    });

button.addEventListener('click', () => {
    systemOfEquations = createSystemOfEquations();

    latexCode = `
    \\[
        \\left\\{
            \\begin{array}{ll}
                ${createEquaitionSide(systemOfEquations.firstEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.firstEquation.rightSide)} \\\\ \\\\
                ${createEquaitionSide(systemOfEquations.secondEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.secondEquation.rightSide)}
            \\end{array}
        \\right.
    \\]`;

    equationDiv.innerHTML = latexCode;

    renderMathInElement(equationDiv, {
        delimiters: [
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false}
          ]
    });
});
const equationDiv = document.getElementById('equation');
const button = document.getElementById('generate-equation-button');
const fractionsCheckbox = document.getElementById('fractions');
const checkAnswerButton = document.getElementById('check-answer-button');
const showAnswerButton = document.getElementById('show-answer-button');
const answerXInput = document.getElementById('inputX');
const answerYInput = document.getElementById('inputY');
const checkResponse = document.getElementById('check-response');
const answerParagraph = document.getElementById('answer-paragraph');

//Render System of Equations on html website
let systemOfEquations;
let useFractions = false;

const renderSystemOfEquations = (systemOfEquations, placeToRender) => {
    let latexCode;

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

    //LaTeX code to generate equations
    latexCode = `
    \\[
        \\left\\{
            \\begin{array}{ll}
                ${createEquaitionSide(systemOfEquations.firstEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.firstEquation.rightSide)} \\\\ \\\\
                ${createEquaitionSide(systemOfEquations.secondEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.secondEquation.rightSide)}
            \\end{array}
        \\right.
    \\]`;

    placeToRender.innerHTML = latexCode;

    renderMathInElement(placeToRender, {
        delimiters: [
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false}
          ]
    });
}

//Render equations on website load
systemOfEquations = createSystemOfEquations(useFractions);
renderSystemOfEquations(systemOfEquations, equationDiv);

//Render equations on button click
button.addEventListener('click', () => {
    systemOfEquations = createSystemOfEquations(useFractions);
    renderSystemOfEquations(systemOfEquations, equationDiv);
});

//Turn on and off fractions
fractionsCheckbox.addEventListener('change', () => {
    useFractions = !useFractions;
})

checkAnswerButton.addEventListener('click', () => {
    let response = checkSystemAnswers(systemOfEquations, answerXInput.value, answerYInput.value);
    if (response) {
        checkResponse.innerHTML = 'Correct';
    } else {
        checkResponse.innerHTML = 'Incorrect'
    }
})
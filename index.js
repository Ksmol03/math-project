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

//Render LaTeX equations on website
const renderSystemOfEquations = (latexText, placeToRender) => {
    placeToRender.innerHTML = latexText;
    renderMathInElement(placeToRender, {
        delimiters: [
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false}
          ]
    });
}

//Render equations on website load
systemOfEquations = createSystemOfEquations(useFractions);
renderSystemOfEquations(createLaTeXtext(systemOfEquations), equationDiv);

//Render equations on button click
button.addEventListener('click', () => {
    systemOfEquations = createSystemOfEquations(useFractions);
    renderSystemOfEquations(createLaTeXtext(systemOfEquations), equationDiv);
    answerXInput.value = '';
    answerYInput.value = '';
    checkResponse.innerHTML = '';
    answerParagraph.innerHTML = '';
    
});

//Turn on and off fractions
fractionsCheckbox.addEventListener('change', () => {
    useFractions = !useFractions;
})

//Show answer check response
checkAnswerButton.addEventListener('click', () => {
    let response = checkSystemAnswers(systemOfEquations, answerXInput.value, answerYInput.value);
    if (response && answerXInput.value != '' && answerYInput.value != '') {
        checkResponse.innerHTML = 'Correct!';
    } else {
        checkResponse.innerHTML = 'Incorrect!'
    }
})

//Show answer
showAnswerButton.addEventListener('click', () => {
    answerParagraph.innerHTML = `x = ${systemOfEquations.x}; y = ${systemOfEquations.y}`
})
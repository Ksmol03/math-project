//Create LaTeX text
const createLaTeXtext = (systemOfEquations) => {
    let latexText;

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
            if (absNumerator == mathWord.denumerator) {
                absNumerator = 1;
                mathWord.numerator = 1;
                mathWord.denumerator = 'None';
            }

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
            return mathWord;
        })
        return result;
    }  

    //LaTeX code to generate equations
    latexText = `
    \\[
        \\left\\{
            \\begin{array}{ll}
                ${createEquaitionSide(systemOfEquations.firstEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.firstEquation.rightSide)} \\\\ \\\\
                ${createEquaitionSide(systemOfEquations.secondEquation.leftSide)} = ${createEquaitionSide(systemOfEquations.secondEquation.rightSide)}
            \\end{array}
        \\right.
    \\]`;

    return latexText;
}


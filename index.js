import createSystemOfEquations from "./createSystemOfEquations.js";

const systemOfEquations = createSystemOfEquations();
console.log(systemOfEquations.firstEquation);
console.log(systemOfEquations.secondEquation);
console.log('X = ', systemOfEquations.x);
console.log('Y = ', systemOfEquations.y);
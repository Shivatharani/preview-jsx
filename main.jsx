import React, { useState } from 'react';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const calculatorStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '50px auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const displayStyles = {
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '2.5em',
    padding: '20px',
    textAlign: 'right',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

  const buttonGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1px',
    backgroundColor: '#ccc', // Acts as button borders
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  };

  const buttonStyles = {
    backgroundColor: '#e0e0e0',
    border: 'none',
    padding: '20px',
    fontSize: '1.5em',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const operatorButtonStyles = {
    backgroundColor: '#f7911b',
    color: '#fff',
  };

  const equalsButtonStyles = {
    backgroundColor: '#22a032',
    color: '#fff',
    gridColumn: 'span 2', // Make equals button span two columns
  };

  const clearButtonStyles = {
    backgroundColor: '#d9534f',
    color: '#fff',
  };

  const handleDigitClick = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const performCalculation = (op, num1, num2) => {
    switch (op) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 === 0 ? 'Error' : num1 / num2;
      default:
        return num2;
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    } else if (firstOperand !== null) {
      const result = performCalculation(operator, firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEqualsClick = () => {
    if (firstOperand === null || operator === null || waitingForSecondOperand) {
      return;
    }

    const secondOperand = parseFloat(displayValue);
    const result = performCalculation(operator, firstOperand, secondOperand);
    setDisplayValue(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div style={calculatorStyles}>
      <div style={displayStyles}>{displayValue}</div>
      <div style={buttonGridStyles}>
        <button style={{ ...buttonStyles, ...clearButtonStyles }} onClick={handleClearClick}>C</button>
        <button style={buttonStyles} onClick={() => handleDigitClick('-')}>+/-</button> {/* Placeholder for sign change, basic implementation in logic below */}
        <button style={buttonStyles} onClick={() => handleOperatorClick('/')}>&divide;</button>
        <button style={{ ...buttonStyles, ...operatorButtonStyles }} onClick={() => handleOperatorClick('*')}>&times;</button>

        <button style={buttonStyles} onClick={() => handleDigitClick(7)}>7</button>
        <button style={buttonStyles} onClick={() => handleDigitClick(8)}>8</button>
        <button style={buttonStyles} onClick={() => handleDigitClick(9)}>9</button>
        <button style={{ ...buttonStyles, ...operatorButtonStyles }} onClick={() => handleOperatorClick('-')}>-</button>

        <button style={buttonStyles} onClick={() => handleDigitClick(4)}>4</button>
        <button style={buttonStyles} onClick={() => handleDigitClick(5)}>5</button>
        <button style={buttonStyles} onClick={() => handleDigitClick(6)}>6</button>
        <button style={{ ...buttonStyles, ...operatorButtonStyles }} onClick={() => handleOperatorClick('+')}>+</button>

        <button style={buttonStyles} onClick={() => handleDigitClick(1)}>1</button>
        <button style={buttonStyles} onClick={() => handleDigitClick(2)}>2</button>
        <button style={buttonStyles} onClick={() => handleDigitClick(3)}>3</button>
        <button style={buttonStyles} onClick={() => handleDigitClick(0)}>0</button>

        <button style={buttonStyles} onClick={handleDecimalClick}>.</button>
        <button style={{ ...buttonStyles, ...equalsButtonStyles }} onClick={handleEqualsClick}>=</button>
      </div>
    </div>
  );
}
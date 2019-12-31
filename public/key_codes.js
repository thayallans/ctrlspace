const key_codes = {
  '\\' : {main_key: '\\',main_key_code: 'Backslash', key_code: 220,},
  '/' : {main_key: '/',main_key_code: 'Slash', key_code: 191,},
  '\'' : {main_key: '\'',main_key_code: 'Quote', key_code: 222,},
  '1' : {main_key: '1',main_key_code: 'Digit1', key_code: 49,},
  '2' : {main_key: '2',main_key_code: 'Digit2', key_code: 50,},
  '3' : {main_key: '3',main_key_code: 'Digit3', key_code: 51,},
  '4' : {main_key: '4',main_key_code: 'Digit4', key_code: 52,},
  '5' : {main_key: '5',main_key_code: 'Digit5', key_code: 53,},
  '6' : {main_key: '6',main_key_code: 'Digit6', key_code: 54,},
  '7' : {main_key: '7',main_key_code: 'Digit7', key_code: 55,},
  '8' : {main_key: '8',main_key_code: 'Digit8', key_code: 56,},
  '9' : {main_key: '9',main_key_code: 'Digit9', key_code: 57,},
  '0' : {main_key: '0',main_key_code: 'Digit0', key_code: 48,},
  '=' : {main_key: '=',main_key_code: 'Equal', key_code: 187,},
  '-' : {main_key: '-',main_key_code: 'Minus', key_code: 189,},
  ',' : {main_key: ',',main_key_code: 'Comma', key_code: 188,},
  '.' : {main_key: '.',main_key_code: 'Period', key_code: 190,},
  'backspace' : {main_key: 'Backspace',main_key_code: 'Backspace', key_code: 8,},
  'esc' : {main_key: 'Escape',main_key_code: 'Escape', key_code: 27,},
  'return' : {main_key: 'Enter',main_key_code: 'Enter', key_code: 13,},
  'tab' : {main_key: 'Tab',main_key_code: 'Tab', key_code: 9,},
  ']' : {main_key: ']',main_key_code: 'BracketRight', key_code: 221,},
  '[' : {main_key: '[',main_key_code: 'BracketLeft', key_code: 219,},
}

try {
  module.exports = { key_codes }
} catch (err) {
  // eslint ignore
}

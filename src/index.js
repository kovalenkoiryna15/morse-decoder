const MORSE_TABLE = {
  '.-':     'a',
  '-...':   'b',
  '-.-.':   'c',
  '-..':    'd',
  '.':      'e',
  '..-.':   'f',
  '--.':    'g',
  '....':   'h',
  '..':     'i',
  '.---':   'j',
  '-.-':    'k',
  '.-..':   'l',
  '--':     'm',
  '-.':     'n',
  '---':    'o',
  '.--.':   'p',
  '--.-':   'q',
  '.-.':    'r',
  '...':    's',
  '-':      't',
  '..-':    'u',
  '...-':   'v',
  '.--':    'w',
  '-..-':   'x',
  '-.--':   'y',
  '--..':   'z',
  '.----':  '1',
  '..---':  '2',
  '...--':  '3',
  '....-':  '4',
  '.....':  '5',
  '-....':  '6',
  '--...':  '7',
  '---..':  '8',
  '----.':  '9',
  '-----':  '0',
};

function decode(expr) {
  let morseKeys = Object.keys(MORSE_TABLE);
  
  function getBinaryCharset(morseKey){
    let chars = morseKey.split('');
    let binaryСharset = []; // max lenght 5 [00, 00, 00, 00, 00]
    binaryСharset = chars.map(el => {
      if(el == '.'){
        return '10';
      } 
      if (el == '-'){
        return '11';
      }
    });
    for(let i=0; i <= 5; i++){
      if (binaryСharset.length < 5){
        binaryСharset.unshift('00');
      }
    }
    return binaryСharset.join('');
  };  
  
  let binaryChars = morseKeys.map(el => {
    let binaryCodeOfChar = getBinaryCharset(el);
    return binaryCodeOfChar;   
  }); // index of binaryCodeOfChar i this Array = index of property in morseKeys Array

  let entryBinaryWords = expr.split('**********');
  //array of words  ["00101010100000000010001011101000101110100000111111", "00001011110000111111000010111000101110100000111010"]

  let entryBinaryWordsByBinaryLeters = entryBinaryWords.map(word => {
    let entryBinaryLetters = [];
    let array = word.split('');
    let arrayCopy = array.slice();

    // ["0", "0", "1", "0", "1", "0", "1", "0", "1", "0", 
    // "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", 
    // "0", "0", "1", "0", "1", "1", "1", "0", "1", "0", 
    // "0", "0", "1", "0", "1", "1", "1", "0", "1", "0", 
    //"0", "0", "0", "0", "1", "1", "1", "1", "1", "1"] 

    for(let i=1; i <= array.length/10; i++){
      let letter = arrayCopy.splice(0, 10).join('');
      // 0010101010
      // 0000000010
      // 0010111010
      // 0010111010
      // 0000111111
      entryBinaryLetters.push(letter);
    };
    // [["0010101010", "0000000010", "0010111010", "0010111010", "0000111111"], ["0000101111", "0000111111", "0000101110", "0010111010", "0000111010"]]
    return entryBinaryLetters;
  });

  
  let entryWords = entryBinaryWordsByBinaryLeters.map(word => {
    let entryWord = word.map(binaryLetter => {    
      let index = binaryChars.indexOf(binaryLetter);
      let propertyName = morseKeys[index];
      return MORSE_TABLE[propertyName];   
    });
    return entryWord;
  });
  let words = entryWords.map(word => {
    return word.join('');
  });

  let string = words.join(' ');

  return string;    
};

module.exports = {
  decode
}
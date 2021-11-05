// replacement cipher with a ceaser shift based on the length of the cipher mod the length of the str, with an additional shift based on the current index of the loop, preventing repeat characters having the same encoded value.

function encode (str, cipher){

    let code = '';
    const values = cipher[0];
    const key = cipher[1];
    const shift = key.length % str.length;

    for (let i=0; i<str.length; i++) {
        const valuePosition = values.indexOf(str[i]);
        code += key[(valuePosition + shift + i) % key.length]
    }

    return code;
}

function decode (code, cipher){

    let str = '';
    const values = cipher[0];
    const key = cipher[1];
    const shift = key.length % code.length;

    for (let i=0; i<code.length; i++) {

        const codePosition = key.indexOf(code[i]);
        let valuePosition = codePosition - shift - i;
        if (valuePosition < 0) {
            valuePosition += key.length;
        }

        str += values[valuePosition];
    }

    return str;
}

function genCiphers(chars) {

    let ciphers = [];
    ciphers.push(chars.split(''));
    let cipher = [];
    let pullPos = luckyNumbers(chars.length,0,chars.length-1);

    for (let j=0; j<pullPos.length; j++) {
        cipher.push(chars[pullPos[j]]);
    }

    ciphers.push(cipher);

    return ciphers;

}

function luckyNumbers(returnArrayLength, minNumber, maxNumber){

    let pool = [];

    for (buildNum=minNumber; buildNum<=maxNumber; buildNum++) { // build the pool of possible results
        pool.push(buildNum);
    }

    let results = [];

    while (results.length < returnArrayLength && pool.length >= 1) { //Loop while we have returned fewer results than requested and the pool is not empty

        let pullIndex = Math.floor(Math.random()*pool.length); // create a random number between 0 (inclusive) and the pool length (exclusive)
        results.push(pool.splice(pullIndex,1)[0]); // splice out the selected element, convert it from an array to a number ([0]), and push it to the results

    }

    return results;

}

const currentCipher = genCiphers('abcdefghijklmnopqrstuvwxyz0123456789 .,?!()[]:;<>+-*/%=|@#$^&{}~ABCDEFGHIJKLMNOPQRSTUVWXYZ');

const code = encode ('I love cryptography!', currentCipher);
const plainText = decode(code, currentCipher);

console.log(code, ' === ', plainText);
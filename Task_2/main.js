//1) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სტრინგს და დააბრუნებს ამ სტირნგის აბრივიატურას მაგალითად getAbbr('John Doe') => "J.D"

function getAbbr(str) {

    let result = '';
    let a = str
        .trim();
    let splitStr = str
        .trim()
        .split(' ')
        .filter(Boolean);
    console.log(splitStr)
    result = splitStr.map(word => {
        if (word != '')
            return word[0].toUpperCase()
    })
        .join('.');
    return result

}

console.log(getAbbr('John Doe'))
console.log(getAbbr('John Doe John Doe John Doe     John Doe'))
const userName = "moamerameramerame"


// 2) დაწერეთ ფუნცქია რომელიც არგუმენტად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვების ჯამს მაგ: getSumOfDigit(123) => 6 ახსნა 1 + 2 + 3

function getSumOfDigit(number) {
    let digit = number.toString().split('')
    console.log(digit)
    let result = 0
    digit.forEach(element => {
        result += parseInt(element)
    });
    return result
}
console.log(getSumOfDigit(123))
// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს სტრინგს და წაშლის ამ სტრინგიდან ყველა გამეორებად ასოს. მაგ: removeDuplicates('banana') => 'ban'
function removeDuplicates(str) {
    let result = ''
    for (let i = 0; i < str.length; i++) {
        if (!result.includes(str[i]))
            result += str[i]
    }
    return result;
}
console.log(removeDuplicates('banana'))
// 4) დაწერეთ ფუნქცია რომელიც წაშლის ყველა სფეისს სტრინგინდან მაგ: removeSpaces('1 2 aab') => '12aab' უნდა გამოიტენოთ for ლუპი
function removeSpaces(str) {
    return str.replaceAll(' ', '')
}
console.log(removeSpaces('1 2 aab'))
// 5) დაწერეთ ფუნცქია რომელიც მიიღებს წინადადებას და შემოაბრუნებს თითოეულ სიტყვას მაგ: reverseEachWord('Hello World') =>  "olleH dlroW"

function reverseEachWord(str) {
   
    let splitStr = str
        .trim()
        .split(' ')
    let result = splitStr
        .map(element => element.split('').reverse().join(''))
        .join(' ');
    return result;
}
console.log(reverseEachWord('Hello World'))

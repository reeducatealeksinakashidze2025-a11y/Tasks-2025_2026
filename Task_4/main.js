// 1) წაშალეთ მასივის თითოეულ ელემენტს წაუშლის ბოლო სიმბოლოს მაგ: ["one","two","three"] => ["on","tw","thre"]
function removeLastChar(array) {
    let result = []
    array.forEach(element => {
        result.push(element.slice(0, element.length - 1))
    })
    return result
}
console.log(removeLastChar(["one", "two", "three"]))

// 2) იპოვეთ მასივში 2 ყველაზე პატარა ელემენტის ჯამი, მაგ: [19,5,42,2,77] => 7 
const numbers = [19, 5, 42, 2, 77]
numbers.sort((a, b) => a - b)
console.log(numbers[0] + numbers[1])
// 3) დააჯგუფეთ მოცემული მასივი ვალუტის მიხედვით, გაითვალისწინეთ თითეუილ ვალუტის ქვეშ უნდა შეინახოთ ტრანსაქციის მნიშვნელობა. მაგ: 
// [
//   { amount: 10, currency: "USD" },
//   { amount: 20, currency: "EUR" },
//   { amount: 5,  currency: "USD" },
//   { amount: 50, currency: "EUR" }
// ]
// შედეგ: {
//   USD: [{ amount: 10 }, { amount: 5 }],
//   EUR: [{ amount: 20 }, { amount: 50 }]
// }
function groupByCurrency(array) {
    let result = {}
    array.forEach(element => {
        if (result[element.currency] === undefined) {
            result[element.currency] = [{ amount: element.amount }]
        }
        else {
            result[element.currency].push({ amount: element.amount })
        }
    });
    return result
}
console.log(groupByCurrency([
    { amount: 10, currency: "USD" },
    { amount: 20, currency: "EUR" },
    { amount: 5, currency: "USD" },
    { amount: 50, currency: "EUR" }
]))


// 4) დაითვალეთ დადებითი რიცხვები და დააჯამეთ უარყოფითი რიცხვები პასუხი უნდა იყოს მასივი [10, -65]
function sumPositivesAndNegatives(array) {
    let positives = 0
    let negatives = 0

    array.forEach(element => {
        if (element > 0)
            positives += element
        else
            negatives += element
    });
    return [positives, negatives]
}

// 5) გამოთვალეთ მასივის რიცხვების ჯამი ForEach ის გამოყენებით მაგ: [10, 12, 4, 2] => 28
function sumAll(array) {
    let sum = 0

    array.forEach(element => {
        sum += element
    });
    return sum
}
console.log(sumAll([10, 12, 4, 2]))


// 6) დაამუშავეთ მასივი რომ დააბრუნოს სტინგი მხოლოდ იმ ელემენტებით რომლის სიგრძე არის 5-ზე მეტი და შეაწებეთ #-ით მაგ: ["cat","parrot","dog","elephant"] => "PARROT#ELEPHANT"

function wordValidation(array) {
    let result = []

    array.forEach(element => {
        if (element.length > 5)
            result.push(element.toUpperCase())
    });
    return result.join('#')
}
console.log(wordValidation(["cat", "parrot", "dog", "elephant"]))

// 7) დააჯგუფეთ მასივი კლასის მიხედვით და გამოითვალეთ საშუალო ქულა, მაგ: 
// [
//   { name: "Ann",  cls: "A", grade: 90 },
//   { name: "Ben",  cls: "B", grade: 75 },
//   { name: "Cara", cls: "A", grade: 80 }
// ]
// შედეგი: {"A": 85, "B" 75}
function averageGrade(array) {
    let result = {}
    array.forEach(element => {
        if (result[element.cls] === undefined) {
            result[element.cls] = [{ grade: element.grade }]
        }
        else {
            result[element.cls].push({ grade: element.grade })
        }

    });
    for (const key in result) {
        let sum = 0 
        result[key].forEach(element => {
            sum += element.grade
        }

        );
        result[key] = sum / result[key].length
    }
    return result   




}
console.log(averageGrade([
    { name: "Ann", cls: "A", grade: 90 },
    { name: "Ben", cls: "B", grade: 75 },
    { name: "Cara", cls: "A", grade: 80 }
]))

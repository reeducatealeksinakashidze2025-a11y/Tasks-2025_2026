// 1) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი, 1 - ობიექტი, 2- ფროფერთი რომელიც გინდათ რომ წაშალოს, ეს ფუნქცია დააბრუნებს ობიექტს რომელშიც წაშლილი იქნება ის ფროფერთი რასაც გადასცემთ.
let obj = {
    firstName: "aaaa",
    lastName: "bbb",
    age: 15,
    phone: "59856564"

}
function removeProperty(obj, propArray) {


    propArray.forEach(element => {
        delete obj[element]
    });
    return obj;
}
console.log(removeProperty(obj, ["firstName", "lastName"]))
// 2) მოცემული გაქვთ მასივი  [
//   { name: "Ana", score: 50 },
//   { name: "Nika", score: 80 },
//   { name: "Luka", score: 70 }
// ] თქვენი მიზანია დაწეროთ ფუნცქია რომელიც არგუმენტად მიიღებს ამ მასივს და დააბრუნებს ლიდერბორდს ქულების მიხედვით. შედეგი: [
//   { name: 'Nika', score: 80, rank: 1 },
//   { name: 'Luka', score: 70, rank: 2 },
//   { name: 'Ana',  score: 50, rank: 3 }
// ]
let task2 = [
    { name: "Ana", score: 50 },
    { name: "Nika", score: 80 },
    { name: "Luka", score: 70 }
]

function scoreRank(obj) {
    let result = obj
        .sort((a, b) => b.score - a.score)
        .map((o, index) => ({ ...o, rank: index + 1 }))
    console.log(obj)
    console.log(result)

}
scoreRank(task2)

// 3) დაწერეთ ფუნცქია რომელიც დააბრუნებს მხოლოდ იმ ობიექტს რომლის სათაურიც ყველაზე გრძელია. მაგ: [
//   { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }
// ] =>   { title: "The Lord of the Rings", year: 2001 }
let task3 = [{ title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }]
function longTitle(obj) {
    return obj.reduce((pre, next) => pre.title.length > next.length ? pre : next)
}
console.log(longTitle(task3))

// 4) დაწერეთ ფუნქცია რომელიც გამოითვლის საშუალო ასაკს თითოეულ დეპარტამენტის და დააბრუნებს შესაბამის ობიექტს. მაგ: [
//   { name: "Ana", dept: "HR", age: 25 },
//   { name: "Nika", dept: "IT", age: 30 },
//   { name: "Luka", dept: "IT", age: 22 }
// ]. => { HR: 25, IT: 26 }
let task4 = [
    { name: "Ana", dept: "HR", age: 25 },
    { name: "Nika", dept: "IT", age: 30 },
    { name: "Luka", dept: "IT", age: 22 }
]
function avarageAgeByDebt(obj) {
    let result = {}
    let everageDept = {}
    obj.forEach(element => {
        if (!everageDept[element.dept])
            everageDept[element.dept] = []
        everageDept[element.dept].push(element.age)
        result[element.dept] = everageDept[element.dept]
            .reduce((pre, next) => pre + next) / everageDept[element.dept].length
    });
    console.log(result)


}
console.log(avarageAgeByDebt(task4))


// 5) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს კომენტარების მასივს და დააბრუნებს სიტყვების რაოდენობას მაგ: [
//   { id:1, comment:"Hello world" },
//   { id:2, comment:"This is great!" },
//   { id:3, comment:"" }
// ] => 5

let task5=[
  { id:1, comment:"Hello world" },
  { id:2, comment:"This is great!" },
  { id:3, comment:"" }
]
function longetSentenceFromObj(obj){
    let result=0
    obj.forEach(element => {
       let count=element.comment.split(' ') 
       if(count.length>result)
        result=count.length
    });
    return result
}
console.log(longetSentenceFromObj(task5))
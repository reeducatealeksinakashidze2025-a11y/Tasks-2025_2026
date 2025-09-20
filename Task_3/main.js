// 1) დაწერეთ ფუნცქცია რომელიც მიიღებს მასივს არგუმენტად და დააბრუნებს ამ მასივის საშუალო არითმეტიკულს.
function  average (array){
let result=0
for (let index = 0; index < array.length; index++) {
    result+=array[index ]
}
return result/array.length

} 
console.log(average([1,2,3,4,5,6,7]))
// 2) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვის შებრუნებულ მასივს თითოეული წევრით. მაგ: 35231 → [1,3,2,5,3]. 0 => [0]

function reverseArray(num) {
    let result=[]
    let numToarray=num.toString().split('');
    return numToarray.map(Number).reverse();
}   
console.log(reverseArray(35231));
// 3) დაწერეთ ფუნქცია რომელიც მიიღებს 2 მასივს არგუმენტად და დააბრუნებს მასივის მხოლოდ იმ წევრებს 
// რომელსაც მეორე მასივი არ შეიცავს მაგ: a = [1, 2] და b = [1] დააბრუნეთ [2]. a = [1, 2, 2, 2, 3] და b = [2] დააბრუნეთ [1, 3].
function differenceArray(a,b){
let result=[]
a.forEach(element => {
    if(b.includes(element)===false)
        result.push(element)
});
return result
}
console.log(differenceArray([1,2,2,2,3],[2]))

// 4) დაწერეთ ფუნცქცია რომელსაც გადმოეცემა მასივი და იპოვე მასივში მეორე ყველაზე დიდი რიცხვი. მაგ: [10, 40, 20, 5, 30] => 30
function secondLargest(array){
    let largest = 0
    let secondLargest = 0;  
    for (let i = 0; i < array.length; i++) {
        if (array[i] > largest) {
            secondLargest = largest;
            largest = array[i];
        } else if (array[i] > secondLargest && array[i] !== largest) {
            secondLargest = array[i];
        }           

    }
    return secondLargest;
}
console.log(secondLargest([10, 40, 20, 5, 30]))

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს სტირნგების მასივს და უნდა დააბრუნოტ მხოლოდ იმ სიტყვების მასივი რომლებიც არის პალინდორმი: 
// * პალინდორმი ეწოდება სიტყვას რომელიც შემობრუნების შემდეგ იგივე მნიშვნელობას ინარჩუნებს. 
// მაგ: ["mom", "car", "level", "dog"] => ["mom", "level"]
function palindromes(array){
    let result=[]
array.forEach(element => {
    for (let index = 0; index < element.length/2; index++) {
        if(element[index]!==element[element.length-1-index])
            return;
    }
    if(!result.includes(element))
        result.push(element)    
})
    
    // array.forEach(element=>{
    //     let reversed=element.split('').reverse().join('')
    //     if(reversed===element)
    //         result.push(element)
    // })
    return result
}
console.log(palindromes(["mom", "car", "level", "dog", "moom"]))

// 6)დაწერეთ ფუნცქია რომელიც მიიღებს რიცხვების მასივს და დააბრუნებთ რომელია ყველაზე ხშირად გამეორებადი რიცხვი მაგ: [4, 5, 6, 5, 4, 5] => 5

function mostFrequent(array){
    let numberCount= {};
    let maxCount = 0;
    let mostFrequent = null;     
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (!numberCount[element]) 
            numberCount[element] = 1;
        
        else
        numberCount[element] += 1;
        if (numberCount[element] > maxCount) {

            maxCount = numberCount[element];
            mostFrequent = element;
        }
    }
    return mostFrequent;
}
console.log(mostFrequent([4, 5, 6, 5, 4, 5]))

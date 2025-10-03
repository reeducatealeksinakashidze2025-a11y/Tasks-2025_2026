// 1) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები: 
// console.log("1");
// setTimeout(() => console.log("2"), 100);
// setTimeout(() => console.log("3"), 0);
// Promise.resolve().then(() => console.log("4"));
// console.log("5");
1, 5, 4, 3, 2

// 2) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები: 
// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });
// console.log("5");
1, 5, 3, 2, 4

// 3) დაწერეთ სლიფ ფუნქცია რომელიც პარამეტრად მიიღებს მილიწამს და დაიძინებს, ანუ სისტემა გაჩერდება პარამეტრის მიხედვით. await sleep(1000) სადაც ამ ფუნცქიას გამოიყენებთ 1 წამი უნდა გაჩერდეს ხოლმე სისტემა, გაითვალისწინეთ await ით უნდა გააჩეროთ ანუ პრომისი უნდა დააბრუნოს ფუნქციამ
 function sleepCustom(sleepMs){
    return new Promise ((res)=>{
        setTimeout(() => res(), sleepMs);
    })
}
async function test() {
    console.log(1)
    await sleepCustom(1000)
    console.log(2)
}
test()


// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს 1-დან 20-მდე თქვენი მიზანია ფუნცქიის შიგნით ფუნქციამ ყოველ 1 წამში რენდომ რიცხვი დააგენერიროს მანამ სანამ რენდომ დაგენერირებული რიცხვი არ დამეთხვევა პარამეტს, როგორც კი ისინი ერთმანეთს დაემთხვევა გააჩერეთ რენდომ რიცხვის დალოგვა.
function stopRendom(number) {
    const interval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * 20) + 1;
        if (randomNum == number) {
            clearInterval(interval);
            console.log(randomNum);
        }
    }, 1000);
}
stopRendom(7)
// 5) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი 1 - ნებისმიერი რიცხვი 2 - დროის ერთეული მილიწამებში, თქვენი მიზანია დალოგოთ რიცხვები ამ რიცხვიდან 0 მდე იმ დროის ინტერვალში რაც არის მეორე პარამეტრი და 0ზე გააჩეროთ.
function logNumbers(number, interval) {
    for (let i = number; i >= 0; i--) {
        setTimeout(() => console.log(i),(number - i) * interval);
    }

}
logNumbers(10,1000)
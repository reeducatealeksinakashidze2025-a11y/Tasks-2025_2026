//1) დაწერეთ ფუნცქია რომელიც გადააკონვერტირებს ცელსიუს ფარენჰეიტში და დააბრუნებს პასუხს.
function cTof(c) {
    let f = c * 9 / 5 + 32;
    return f
}
console.log("36c=" + cTof(36) + "f");
console.log("37c=" + cTof(37) + "f");
console.log("38c=" + cTof(38) + "f");
console.log("38c=" + cTof("ააა") + "f");

//2) დაწერე თუნცქია რომელიც მიიღებს სტრინგს არგუმენტად და დააბრუნებს ამ სრინგის შებრუნებულს(reverse)
function reverse(s) {
    let r = "";
    for (let i = s.length - 1; i >= 0; i--) {
        r += s[i];
    }

    return r
}
console.log("aleksi reverse " + reverse("aleksi"));
console.log("giorgi reverse " + reverse("giorgi"));

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს წინადადებას და დათვლის რამდენი სიტყვაა შიგნით(ეს ლექციაზე არ გაგვიკეთებია მაგრამ შეგიძლია დასერჩოთ)
function countWords(sentence) {
    let count = 1;
    let notEmpty = true;

    for (let i = 0; i < sentence.length; i++) {

        if (sentence[i] === " " && sentence[i - 1] != " " && i != 0 && i != sentence.length - 1) {
            count++;
        }
        if (sentence[i] != " ") {
            notEmpty = false;
        }
    }
    if (notEmpty) {
        return 0;
    }
    return count;
}
console.log("word count " + countWords("დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს წინადადებას და დათვლის რამდენი სიტყვაა შიგნით (ეს ლექციაზე არ გაგვიკეთებია მაგრამ შეგიძლია დასერჩოთ)"));
console.log("word count " + countWords("და"));
console.log("word count " + countWords("სად"));
console.log("word count " + countWords("  "));
console.log("word count " + countWords(" "));
// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სიტყვას და დააბრუნებს რამდენი ხმოვანია ამ სიტყვაში
function countVowels(word) {
    let count = 0;
    let vowels = "აეიოუ";
    for (let j = 0; j < vowels.length; j++) {
        for (let i = 0; i < word.length; i++) {
            if (vowels[j] == word[i]) {
                count++;
            }
        }
    }
    return count;
}
console.log("vowel count " + countVowels("ალექსი"));
console.log("vowel count " + countVowels("გიორგი"));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ ამ რიცხვის ფაქტორიალს
function factorial(n) {
    let f = 1;
    for (let i = 1; i <= n; i++) {
        f = f * i;
    }
    return f;
}
console.log("5!=" + factorial(5));
console.log("6!=" + factorial(6));
console.log("7!=" + factorial(7));
// 6) დაწერეთ ფუნცქია რომლეიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ 0 დან ამ რიცხვამდე მხოლოდ ლუწი რიცხვების ჯამს
function sumEven(n) {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        if (i % 2 == 0) {
            sum = sum + i;
        }
    }
    return sum;
}

console.log("sum even 1=" + sumEven(1));
console.log("sum even 10=" + sumEven(10));
console.log("sum even 1=" + sumEven(2));
console.log("sum even 0=" + sumEven(0));

// 7) დაწერეთ ფუნცქია რომელიც მიიღებს სტუდენტის ქულას არგუმენტად და დაგირბუნებთ სტუდენტის შეფასებას A,B,C,E,F
function assessment(score) {
    if (score >= 90 && score <= 100) {
        return "A";
    } else if (score >= 80 && score < 90) {
        return "B";
    } else if (score >= 70 && score < 80) {
        return "C";
    } else if (score >= 60 && score < 70) {
        return "E";
    } else if (score >= 0 && score < 60) {
        return "F";
    } else {
        return "error";
    }
}
console.log("assessment 95=" + assessment(95));
console.log("assessment 85=" + assessment(85));
console.log("assessment 75=" + assessment(75));
console.log("assessment 65=" + assessment(65));
console.log("assessment 55=" + assessment(55));
console.log("assessment -5=" + assessment(-5));
console.log("assessment 105=" + assessment(105));
// 8) დაწერეთ ფუნცქია რომელიც მიიღებს პაროლს პარამეტრად თქვენი მიზანია შეამოწმოთ თუ არის 8 სიმბოლოზე მეტი შეიცავს რიცხვს და ერთი დიდ ასოს(capital letter)
function validatePassword(password) {
    let hasNumber = false;

    let hasCapital = false;
    if (password.length < 8) {
        return "not valid";
    }
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= '0' && password[i] <= '9') {
            hasNumber = true;
        }
        if (password[i] >= 'A' && password[i] <= 'Z') {
            hasCapital = true;
        }
    }
    return hasNumber && hasCapital ? `valid` : `not valid`;
}
console.log("validatePassword " + validatePassword("Abcdef1g"));
console.log("validatePassword " + validatePassword("abcdef1g"));
console.log("validatePassword " + validatePassword("Abcdefgh"));
console.log("validatePassword " + validatePassword("Ab1"));
console.log("validatePassword " + validatePassword(" "));

var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        (this.width = width), (this.height = height);
    }
    Rectangle.prototype.calculateRectangleArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.calculateRectanglePerimeter = function () {
        return 2 * (this.width + this.height);
    };
    return Rectangle;
}());
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.calculateCircleArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    Circle.prototype.calculateCirclePerimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    return Circle;
}());
// Independent Functions
function addNumbers(a, b) {
    return a + b;
}
function multiplyNumbers(a, b) {
    return a * b;
}
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function filterEvenNumbers(numbers) {
    return numbers.filter(function (num) { return num % 2 === 0; });
}
function findMax(numbers) {
    return Math.max.apply(Math, numbers);
}
function isPalindrome(str) {
    var cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    var reversedStr = cleanStr.split("").reverse().join("");
    return cleanStr === reversedStr;
}
function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * calculateFactorial(n - 1);
    }
}
// Test Cases
// სასურველია გავაკეთოთ Rectangle და Circle კლაზები და დავუმატოთ შესაბამისი მეთოდები.
var rectangle = new Rectangle(5, 8);
var circle = new Circle(3);
var rectangleArea = rectangle.calculateRectangleArea();
var rectanglePerimeter = rectangle.calculateRectanglePerimeter();
var circleArea = circle.calculateCircleArea();
var circlePerimeter = circle.calculateCirclePerimeter();
console.log("Rectangle Area: ".concat(rectangleArea, ", Perimeter: ").concat(rectanglePerimeter));
console.log("Circle Area: ".concat(circleArea, ", Perimeter: ").concat(circlePerimeter));
var sumResult = addNumbers(5, 3);
var multiplicationResult = multiplyNumbers(4, 7);
var capitalizedString = capitalizeString("javascript is fun");
var evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);
console.log("Sum: ".concat(sumResult));
console.log("Multiplication: ".concat(multiplicationResult));
console.log("Capitalized String: ".concat(capitalizedString));
console.log("Even Numbers: ".concat(evenNumbers));
var maxNumber = findMax([23, 56, 12, 89, 43]);
var isPalindromeResult = isPalindrome("A man, a plan, a canal, Panama");
var factorialResult = calculateFactorial(5);
console.log("Max Number: ".concat(maxNumber));
console.log("Is Palindrome: ".concat(isPalindromeResult));
console.log("Factorial: ".concat(factorialResult));
/*

2. შევქმნათ კლასი BankAccount რომელსაც ექნება accountNumber,balance და transactionHistory ფროფერთები.
   კონსტრუქტორში უნდა ვიღებდეთ accountNumber და initialBalance მნიშვნელობებს.
   გარედან არუნდა იყოს შესაძლებელი accountNumber, balance და transactionHistory შეცვლა.
   კლასში უნდა გვქონდეს მეთოდები:
   getAccountInfo
   deposit - თანხის დამატება ანგარიშზე.
   withdraw - თანხის მოკლება ანგარიშიდან.
   transferFunds - გადარიცხვა სხვა BankAccount_ზე
   getTransactionHistory - აბრუნებს transactionHistory_ მასივს
   recordTransaction - transactionHistory_ში ამატებს ჩნაწერს ტრანსფერის შესახებ

   შევქმნათ მინიმუმ 2 BankAccount_ის ინსტანსი.
   გავაკეთოთ სხვადასხვა ოპერაციები.
   დავბეჯდოთ შექმნილი ექაუნთების transactionHistory.

*/
var BankAccount = /** @class */ (function () {
    function BankAccount(accountNumber, balance) {
        this.transactionHistory = [];
        (this.accountNumber = accountNumber), (this.balance = balance);
    }
    BankAccount.prototype.getAccountInfo = function () {
        console.log("accountNumber:".concat(this.accountNumber, "  balabce:").concat(this.balance));
    };
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
        this.transactionHistory.push("deposit: ".concat(amount));
    };
    BankAccount.prototype.withdraw = function (amount) {
        if (this.balance > amount) {
            this.balance -= amount;
            this.transactionHistory.push("withdraw: ".concat(amount));
        }
        else
            this.transactionHistory.push("not enough money");
    };
    BankAccount.prototype.transferFunds = function (amount, bankAccount) {
        if (this.balance > amount) {
            this.balance -= amount;
            bankAccount.deposit(amount);
            this.transactionHistory.push("transfer: ".concat(amount, " to account ").concat(bankAccount.accountNumber));
        }
        else
            this.transactionHistory.push("not enough money");
    };
    BankAccount.prototype.getTransactionHistory = function () {
        return this.transactionHistory;
    };
    //მეთოდმა რა უნდა გააკეთოს კარგად ვერ გავიგე
    BankAccount.prototype.recordTransaction = function (message) {
        this.transactionHistory.push(message);
    };
    return BankAccount;
}());
var ba = new BankAccount(111, 500);
var ba2 = new BankAccount(112, 300);
ba.getAccountInfo();
ba.deposit(100);
ba.withdraw(50);
ba.transferFunds(50, ba2);
console.log(ba.getTransactionHistory());

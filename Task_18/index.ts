class Rectangle {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    (this.width = width), (this.height = height);
  }
  calculateRectangleArea(): number {
    return this.width * this.height;
  }
  calculateRectanglePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  calculateCircleArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
  calculateCirclePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// Independent Functions

function addNumbers(a: number, b: number) {
  return a + b;
}

function multiplyNumbers(a: number, b: number) {
  return a * b;
}

function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterEvenNumbers(numbers: number[]) {
  return numbers.filter((num) => num % 2 === 0);
}

function findMax(numbers: number[]) {
  return Math.max(...numbers);
}

function isPalindrome(str: string) {
  const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const reversedStr = cleanStr.split("").reverse().join("");
  return cleanStr === reversedStr;
}

function calculateFactorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}

// Test Cases

// სასურველია გავაკეთოთ Rectangle და Circle კლაზები და დავუმატოთ შესაბამისი მეთოდები.

const rectangle = new Rectangle(5, 8);
const circle = new Circle(3);

const rectangleArea = rectangle.calculateRectangleArea();
const rectanglePerimeter = rectangle.calculateRectanglePerimeter();

const circleArea = circle.calculateCircleArea();
const circlePerimeter = circle.calculateCirclePerimeter();

console.log(
  `Rectangle Area: ${rectangleArea}, Perimeter: ${rectanglePerimeter}`
);
console.log(`Circle Area: ${circleArea}, Perimeter: ${circlePerimeter}`);

const sumResult = addNumbers(5, 3);
const multiplicationResult = multiplyNumbers(4, 7);
const capitalizedString = capitalizeString("javascript is fun");
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(`Sum: ${sumResult}`);
console.log(`Multiplication: ${multiplicationResult}`);
console.log(`Capitalized String: ${capitalizedString}`);
console.log(`Even Numbers: ${evenNumbers}`);

const maxNumber = findMax([23, 56, 12, 89, 43]);
const isPalindromeResult = isPalindrome("A man, a plan, a canal, Panama");
const factorialResult = calculateFactorial(5);

console.log(`Max Number: ${maxNumber}`);
console.log(`Is Palindrome: ${isPalindromeResult}`);
console.log(`Factorial: ${factorialResult}`);

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
class BankAccount {
  private accountNumber: number;
  private balance: number;
  private transactionHistory: string[] = [];
  constructor(accountNumber: number, balance: number) {
    (this.accountNumber = accountNumber), (this.balance = balance);
  }
  getAccountInfo() {
    console.log(`accountNumber:${this.accountNumber}  balabce:${this.balance}`);
  }
  deposit(amount: number) {
    this.balance += amount;
    this.transactionHistory.push(`deposit: ${amount}`);
  }
  withdraw(amount: number) {
    if (this.balance > amount) {
      this.balance -= amount;
      this.transactionHistory.push(`withdraw: ${amount}`);
    } else this.transactionHistory.push("not enough money");
  }
  transferFunds(amount: number, bankAccount: BankAccount) {
    if (this.balance > amount) {
      this.balance -= amount;
      bankAccount.deposit(amount);
      this.transactionHistory.push(
        `transfer: ${amount} to account ${bankAccount.accountNumber}`
      );
    } else this.transactionHistory.push("not enough money");
  }
  getTransactionHistory(): string[] {
    return this.transactionHistory;
  }
  //მეთოდმა რა უნდა გააკეთოს კარგად ვერ გავიგე
  recordTransaction(message: string) {
    this.transactionHistory.push(message);
  }
}
const ba = new BankAccount(111, 500);
const ba2 = new BankAccount(112, 300);
ba.getAccountInfo();
ba.deposit(100);
ba.withdraw(50);
ba.transferFunds(50,ba2);
console.log(ba.getTransactionHistory());

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseQueryDto } from './dto/expense-query.dto';

@Injectable()
export class ExpensesService {
 private expenses = [
  { id: 1, category: 1, productName: "Laptop", quantity: 2, price: 2500, totalPrice: 5000 },
  { id: 2, category: 2, productName: "Mouse", quantity: 5, price: 50, totalPrice: 250 },
  { id: 3, category: 3, productName: "Office Chair", quantity: 1, price: 800, totalPrice: 800 },
  { id: 4, category: 1, productName: "Smartphone", quantity: 3, price: 1200, totalPrice: 3600 },
  { id: 5, category: 4, productName: "Groceries", quantity: 10, price: 45.5, totalPrice: 455 },
  { id: 6, category: 5, productName: "Jacket", quantity: 1, price: 150, totalPrice: 150 },
  { id: 7, category: 6, productName: "Movie Ticket", quantity: 4, price: 15, totalPrice: 60 },
  { id: 8, category: 2, productName: "Keyboard", quantity: 2, price: 80, totalPrice: 160 },
  { id: 9, category: 7, productName: "Restaurant Dinner", quantity: 2, price: 120, totalPrice: 240 },
  { id: 10, category: 8, productName: "Gasoline", quantity: 1, price: 60, totalPrice: 60 },
  { id: 11, category: 9, productName: "Coffee", quantity: 15, price: 5, totalPrice: 75 },
  { id: 12, category: 3, productName: "Desk", quantity: 1, price: 350, totalPrice: 350 },
  { id: 13, category: 4, productName: "Vegetables", quantity: 8, price: 12.3, totalPrice: 98.4 },
  { id: 14, category: 1, productName: "Monitor", quantity: 2, price: 400, totalPrice: 800 },
  { id: 15, category: 10, productName: "Internet Bill", quantity: 1, price: 80, totalPrice: 80 },
  { id: 16, category: 5, productName: "Shoes", quantity: 1, price: 200, totalPrice: 200 },
  { id: 17, category: 6, productName: "Concert Ticket", quantity: 2, price: 150, totalPrice: 300 },
  { id: 18, category: 2, productName: "Webcam", quantity: 1, price: 90, totalPrice: 90 },
  { id: 19, category: 7, productName: "Takeout", quantity: 5, price: 25, totalPrice: 125 },
  { id: 20, category: 8, productName: "Parking", quantity: 3, price: 20, totalPrice: 60 },
  { id: 21, category: 9, productName: "Snacks", quantity: 20, price: 3.5, totalPrice: 70 },
  { id: 22, category: 3, productName: "Lamp", quantity: 2, price: 45, totalPrice: 90 },
  { id: 23, category: 4, productName: "Meat", quantity: 3, price: 80, totalPrice: 240 },
  { id: 24, category: 1, productName: "Tablet", quantity: 1, price: 600, totalPrice: 600 },
  { id: 25, category: 10, productName: "Electricity Bill", quantity: 1, price: 120, totalPrice: 120 },
  { id: 26, category: 5, productName: "Sweater", quantity: 2, price: 70, totalPrice: 140 },
  { id: 27, category: 6, productName: "Book", quantity: 4, price: 20, totalPrice: 80 },
  { id: 28, category: 2, productName: "External HDD", quantity: 1, price: 120, totalPrice: 120 },
  { id: 29, category: 7, productName: "Bar Tab", quantity: 1, price: 85, totalPrice: 85 },
  { id: 30, category: 8, productName: "Taxi Ride", quantity: 4, price: 35, totalPrice: 140 },
  { id: 31, category: 9, productName: "Lunch", quantity: 10, price: 18, totalPrice: 180 },
  { id: 32, category: 3, productName: "Bookshelf", quantity: 1, price: 180, totalPrice: 180 },
  { id: 33, category: 4, productName: "Dairy Products", quantity: 6, price: 15, totalPrice: 90 },
  { id: 34, category: 1, productName: "Headphones", quantity: 3, price: 150, totalPrice: 450 },
  { id: 35, category: 10, productName: "Water Bill", quantity: 1, price: 40, totalPrice: 40 },
  { id: 36, category: 5, productName: "Pants", quantity: 2, price: 90, totalPrice: 180 },
  { id: 37, category: 6, productName: "Streaming Subscription", quantity: 1, price: 15, totalPrice: 15 },
  { id: 38, category: 2, productName: "Mouse Pad", quantity: 5, price: 10, totalPrice: 50 },
  { id: 39, category: 7, productName: "Fast Food", quantity: 8, price: 12, totalPrice: 96 },
  { id: 40, category: 8, productName: "Tolls", quantity: 5, price: 8, totalPrice: 40 },
  { id: 41, category: 9, productName: "Tea", quantity: 12, price: 4, totalPrice: 48 },
  { id: 42, category: 3, productName: "Filing Cabinet", quantity: 1, price: 220, totalPrice: 220 },
  { id: 43, category: 4, productName: "Fruit", quantity: 10, price: 25, totalPrice: 250 },
  { id: 44, category: 1, productName: "Printer", quantity: 1, price: 300, totalPrice: 300 },
  { id: 45, category: 10, productName: "Phone Bill", quantity: 1, price: 70, totalPrice: 70 },
  { id: 46, category: 5, productName: "Hat", quantity: 3, price: 35, totalPrice: 105 },
  { id: 47, category: 6, productName: "Gym Membership", quantity: 1, price: 50, totalPrice: 50 },
  { id: 48, category: 2, productName: "USB Hub", quantity: 4, price: 25, totalPrice: 100 },
  { id: 49, category: 7, productName: "Pizza", quantity: 3, price: 30, totalPrice: 90 },
  { id: 50, category: 8, productName: "Bus Ticket", quantity: 10, price: 5, totalPrice: 50 },
  { id: 51, category: 9, productName: "Candy", quantity: 20, price: 2, totalPrice: 40 },
  { id: 52, category: 3, productName: "Whiteboard", quantity: 1, price: 80, totalPrice: 80 },
  { id: 53, category: 4, productName: "Bread", quantity: 15, price: 3.5, totalPrice: 52.5 },
  { id: 54, category: 1, productName: "Smartwatch", quantity: 1, price: 350, totalPrice: 350 },
  { id: 55, category: 10, productName: "Heating Bill", quantity: 1, price: 150, totalPrice: 150 },
  { id: 56, category: 5, productName: "Scarf", quantity: 2, price: 40, totalPrice: 80 },
  { id: 57, category: 6, productName: "Magazine Subscription", quantity: 1, price: 20, totalPrice: 20 },
  { id: 58, category: 2, productName: "Cable", quantity: 6, price: 15, totalPrice: 90 },
  { id: 59, category: 7, productName: "Sushi", quantity: 2, price: 60, totalPrice: 120 },
  { id: 60, category: 8, productName: "Train Ticket", quantity: 2, price: 100, totalPrice: 200 },
  { id: 61, category: 9, productName: "Juice", quantity: 8, price: 6, totalPrice: 48 },
  { id: 62, category: 3, productName: "Chair Mat", quantity: 1, price: 55, totalPrice: 55 },
  { id: 63, category: 4, productName: "Eggs", quantity: 12, price: 4, totalPrice: 48 },
  { id: 64, category: 1, productName: "Router", quantity: 1, price: 130, totalPrice: 130 },
  { id: 65, category: 10, productName: "Trash Service", quantity: 1, price: 30, totalPrice: 30 },
  { id: 66, category: 5, productName: "Gloves", quantity: 2, price: 25, totalPrice: 50 },
  { id: 67, category: 6, productName: "Video Game", quantity: 1, price: 60, totalPrice: 60 },
  { id: 68, category: 2, productName: "Speaker", quantity: 2, price: 180, totalPrice: 360 },
  { id: 69, category: 7, productName: "Burger", quantity: 5, price: 15, totalPrice: 75 },
  { id: 70, category: 8, productName: "Uber Ride", quantity: 6, price: 25, totalPrice: 150 },
  { id: 71, category: 9, productName: "Ice Cream", quantity: 4, price: 8, totalPrice: 32 },
  { id: 72, category: 3, productName: "Monitor Stand", quantity: 1, price: 70, totalPrice: 70 },
  { id: 73, category: 4, productName: "Rice", quantity: 5, price: 10, totalPrice: 50 },
  { id: 74, category: 1, productName: "Laptop Bag", quantity: 1, price: 80, totalPrice: 80 },
  { id: 75, category: 10, productName: "Cable TV", quantity: 1, price: 90, totalPrice: 90 },
  { id: 76, category: 5, productName: "Belt", quantity: 1, price: 45, totalPrice: 45 },
  { id: 77, category: 6, productName: "Museum Ticket", quantity: 2, price: 25, totalPrice: 50 },
  { id: 78, category: 2, productName: "SSD", quantity: 1, price: 200, totalPrice: 200 },
  { id: 79, category: 7, productName: "Sandwich", quantity: 10, price: 10, totalPrice: 100 },
  { id: 80, category: 8, productName: "Bike Rental", quantity: 3, price: 20, totalPrice: 60 },
  { id: 81, category: 9, productName: "Water Bottle", quantity: 5, price: 12, totalPrice: 60 },
  { id: 82, category: 3, productName: "Ergonomic Mouse", quantity: 1, price: 100, totalPrice: 100 },
  { id: 83, category: 4, productName: "Pasta", quantity: 8, price: 5, totalPrice: 40 },
  { id: 84, category: 1, productName: "Docking Station", quantity: 1, price: 250, totalPrice: 250 },
  { id: 85, category: 10, productName: "Insurance", quantity: 1, price: 200, totalPrice: 200 },
  { id: 86, category: 5, productName: "Socks", quantity: 6, price: 8, totalPrice: 48 },
  { id: 87, category: 6, productName: "Theater Play", quantity: 2, price: 80, totalPrice: 160 },
  { id: 88, category: 2, productName: "Cooling Pad", quantity: 1, price: 40, totalPrice: 40 },
  { id: 89, category: 7, productName: "Tacos", quantity: 4, price: 18, totalPrice: 72 },
  { id: 90, category: 8, productName: "Flight Ticket", quantity: 1, price: 450, totalPrice: 450 },
  { id: 91, category: 9, productName: "Smoothie", quantity: 7, price: 7, totalPrice: 49 },
  { id: 92, category: 3, productName: "Standing Desk", quantity: 1, price: 500, totalPrice: 500 },
  { id: 93, category: 4, productName: "Oil", quantity: 2, price: 15, totalPrice: 30 },
  { id: 94, category: 1, productName: "Graphics Card", quantity: 1, price: 800, totalPrice: 800 },
  { id: 95, category: 10, productName: "Rent", quantity: 1, price: 1500, totalPrice: 1500 },
  { id: 96, category: 5, productName: "Watch", quantity: 1, price: 300, totalPrice: 300 },
  { id: 97, category: 6, productName: "Online Course", quantity: 1, price: 99, totalPrice: 99 },
  { id: 98, category: 2, productName: "RAM Upgrade", quantity: 2, price: 120, totalPrice: 240 },
  { id: 99, category: 7, productName: "Steak Dinner", quantity: 1, price: 200, totalPrice: 200 },
  { id: 100, category: 8, productName: "Hotel Stay", quantity: 2, price: 250, totalPrice: 500 }
];

  getAllExpenses({page,take, category,priceFrom, priceTo}:ExpenseQueryDto) {
    const query=this.expenses
    .filter(o=> 
      (category === undefined || o.category === category) &&
      (priceFrom === undefined || o.price >= priceFrom) &&
      (priceTo === undefined || o.price <= priceTo))

    const start = (page-1)*take
    const end= page* take
    return query.slice(start,end);
  }

  getExpenseById(id: number) {
    const expense = this.expenses.find((e) => e.id === id);
    if (!expense) throw new NotFoundException('expense not found');
    return expense;
  }

  createExpense({
    category,
    productName,
    quantity,
    price
  }: CreateExpenseDto) {
    if (!category || !productName || !quantity || !price)
      throw new HttpException('all fild is required', HttpStatus.BAD_REQUEST);
    const lastIndex = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastIndex + 1,
      category: category,
      productName: productName,
      quantity: quantity,
      price: price,
      totalPrice: quantity * price,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }
  updateExpense(
    id: number,
    { category, productName, quantity, price }: UpdateExpenseDto,
  ) {
    const expenseIndex = this.expenses.findIndex((e) => e.id === id);
    if (expenseIndex === -1) throw new NotFoundException('expense not found');

    const currentExpense = this.expenses[expenseIndex];

    const expenseReq = {};
    if (category) expenseReq['category'] = category;
    if (productName) expenseReq['productName'] = productName;
    if (quantity) expenseReq['quantity'] = quantity;
    if (price) expenseReq['price'] = price;
    if (quantity || price)
      expenseReq['totalPrice'] =
        (quantity ?? currentExpense.quantity) * (price ?? currentExpense.price);

    this.expenses[expenseIndex] = {
      ...this.expenses[expenseIndex],
      ...expenseReq,
    };

    return this.expenses[expenseIndex];
  }
  deleteExpense(id: number) {
    const expenseIndex = this.expenses.findIndex((e) => e.id === id);
    if (expenseIndex === -1) throw new NotFoundException('expense not found');

    const deletedExpense = this.expenses.splice(expenseIndex, 1);
    return deletedExpense;
  }
}

// 3) შექმენით car.js და cars.json ფაილები. როდესაც გამოიძახებთ ბრძანებას node car.js Ferrari
// 2020 red უნდა დაამატოთ ეს მანქანის ინფორმაცია cars.json ში. გაითვალისწინეთ თითოეულ დამატებულ
//  ობიექტს უნდა ჰქონდეს, carName, carColor, carReleaseDate. 5 ჯერ რო გავუშვა ეს ბრძანება 5 ახალი
//  მანქანა უნდა იყოს დამატებული cars.json ში. როდესაც გამოვიძახებ node car.js show 2020 უნდა 
// გამოაჩინოს მხოლოდ 2020 წლის მანქანები, როცა გამოვიძახებ node car.js show red უნდა გამოაჩინოს
//  მხოლოდ წითელი ფერის მანქანები

const fs = require('fs/promises')
const [, , arg1, arg2, arg3] = process.argv

async function main() {

    const readDate = await fs.readFile('cars.json', 'utf8')
    const cars = JSON.parse(readDate)
    if (arg1 === 'show') {
        const result = cars.find(o => o.carReleaseDate === arg2 || o.carColor === arg3)
        console.log(result)
        return
    }
    else {
        const car = {
            carName: arg1,
            carReleaseDate: arg2,
            carColor: arg3
        }
        cars.push(car)

        await fs.writeFile('cars.json', JSON.stringify(cars))
        console.log('added car successfully')
    }

}
main()
// 1) წამოიღეთ ინფომრაცია ამ API-დან  https://jsonplaceholder.typicode.com/users და მირებული 
// შედეგი ჩაწერეთ users.json ში ოღონდ იუზერებს უნდა ქონდეთ მხოლოდ id, name, username და email

const fs = require('fs/promises')
async function writeDateinFile() {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const res = await resp.json();
    const mapRes = res.map(({ id, name, username, email }) => ({
        id,
        name,
        username,
        email
    }))
    await fs.writeFile('users.json', JSON.stringify(mapRes))
    console.log('writed successfully')
}
writeDateinFile()
// 2) შექმენით phone.js და contacts.json ფაილები, თქვენი მიზანია შექმნათ phone cli თული რომელსაც 
// ქნება დამატება, წაშლა და ყველა კონტაქტის წაკითხვის ფუნცქიონალი. node phone.js add 555151515 nika 
// უნდა დაემატოს ეს ნომერი contacts.json ში. გაითვალისწინეთ დაადოთ ვალიდაცია და თუ ნომერი არსობბს
//  არ დაამატოს იგივე ნომერი. წაშლითაც ნომერს გადასცემთ და ის ნომერი წაშლება contacts.json დან. 
// node phone.js delete 555151515. node phone.js show უნდა გაჩვენოთ ყველა კონტაქტი.

// 3) შექმენით car.js და cars.json ფაილები. როდესაც გამოიძახებთ ბრძანებას node car.js Ferrari
// 2020 red უნდა დაამატოთ ეს მანქანის ინფორმაცია cars.json ში. გაითვალისწინეთ თითოეულ დამატებულ
//  ობიექტს უნდა ჰქონდეს, carName, carColor, carReleaseDate. 5 ჯერ რო გავუშვა ეს ბრძანება 5 ახალი
//  მანქანა უნდა იყოს დამატებული cars.json ში. როდესაც გამოვიძახებ node car.js show 2020 უნდა 
// გამოაჩინოს მხოლოდ 2020 წლის მანქანები, როცა გამოვიძახებ node car.js show red უნდა გამოაჩინოს
//  მხოლოდ წითელი ფერის მანქანები

// 4) შექმენით ფაილი random.txt შიგნით დაწერეთ რაიმე წინადადება თქვენი მიზანია დაითვალოთ რამდენი
//  სიტყვა, რამდენი ხმოვანი და რამდენი ასოა ამ ფაილში და ჩაწეროთ შედეგი result.json ში შემდეგი სახით 
//  {word: 20, vowel: 64, chars: 152}

const vowels = ['a', 'e', 'i', 'o', 'u'];
async function characterCount() {
    let result = {
        word: 0,
        volwe: 0,
        chars: 0
    }
    const res = await fs.readFile('random.txt', 'utf8');
    result.word = res.split(' ').length;
    const trimRes = res.trim();
    for (let index = 0; index < trimRes.length; index++) {
        const char = trimRes[index].toLocaleLowerCase();
        if (vowels.some(o => o === char))
            result.volwe++;
        else

            if (char >= 'a' && char <= 'z')
                result.chars++;

    }
    await fs.writeFile('result.json', JSON.stringify(result))
    console.log('writed successfully')
}
characterCount();
// 1) დაწერეთ ფუნქცია რომელიც წამოიღებს დეითას ამ საიტიდან
//  https://jsonplaceholde.typicode.com, url სპეციალურად არის არასწორი თქვენი მიზანია 
// რომ როდესაც რექუსთი დაფეილდება გააკეთოთ რეთრაი 5 ჯერ. 
async function retryCall(url, retries = 5, attempt = 1) {

    try {
        if (retries == 0) {
            console.log(`all try is failed`)
            return
        }
        let response = await fetch(url)
        return await response.json()
    } catch (err) {
        console.log(`${attempt} try is failed`)
        return await retryCall(url, retries - 1, attempt + 1)
    }

}
retryCall('https://jsonplaceholde.typicode.com', 5)


// 2) დაწერეთ ფუნცქია რომელიც წამოიღებს მონაცემებს ამ ორი
// url-დან https://dummyjson.com/users და https://jsonplaceholder.typicode.com/users
// თქვენი მიზანია დალოგოთ მხოლოდ ის რომელიც მოასწრებს დარიზოლვებას.
function delayFetch(url, ms) {
    return new Promise(res => {
        setTimeout(() => res(fetch(url)), ms)
    })
}
async function raceOne(url1, url2) {
  return Promise.race([delayFetch(url1,1000) , delayFetch(url2,2000)])
    .then(res =>  res.json())  
    .then(res => console.log("result", res))  
    .catch(err => console.log("err",err));
}



raceOne(
  'https://dummyjson.com/users',
  'https://jsonplaceholder.typicode.com/users'
);

// 3) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას
// https://dummyjson.com/products ამ url-დან, შემდეგ გაფილტავას და დალოგავს მხოლოდ
// იმ პროდუქტებს რომელთა ფასიც არის 10-ზე მეტი

async function filteredPrice(url) {
    let res = await fetch(url)
    const data = await res.json();
    return data.products.filter(o => o.price > 10);
}
filteredPrice('https://dummyjson.com/products')
    .then(result => console.log(result));
// 4) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას ამ url-დან
// https://dummyjson.com/users, გაფილტრავს მხოლოდ ისეთ იუზერებს
// რომელთა პროფესია არის web developer და დალოგავს მხოლოდ შემდეგ
//  ფროფერთებს: სახელი, გვარი, მისამართი(ქალაქი), იმეილი და ტელეფონის ნომერი.
async function returnWeb(title) {
    const res = await fetch('https://dummyjson.com/users')
    const data = await res.json();
    return data.users.filter(o => o.company.title === title)
    .map(o => ({
        firstName: o.firstName,
        lastName: o.lastName,
        city: o.address.city,
        email: o.email,
        phone: o.phone
    }))
}

returnWeb('Sales Manager')
    .then(result => console.log(result))
     .catch(err => console.log('err'));
// 5) დაწერეთ ფუნქცია რომელიც წამოიღებს იმფორმაციას ერთდროულად შემდეგი
// api-დან: https://dummyjson.com/recipes, https://dummyjson.com/comments,
//  https://dummyjson.com/todos, https://dummyjson.com/quotes და ყველას
//  დარიზოლვებულ და ჯეისონში გადმოტრანსფორმირებულ შედეგებს დალოგავთ.
// აუცილებელია რომ ყველა გაეშვას ერთდროულად
async function main(){

    const res = await Promise.allSettled([
        fetch('https://dummyjson.com/recipes'),
        fetch('https://dummyjson.com/comments'),
        fetch('https://dummyjson.com/todos'),
        fetch('https://dummyjson.com/quotes')
       
    ])
       const success = res.filter(el => el.status === 'fulfilled')
       .map(el => el.value)
        const data = await Promise.all(success.map(r => r.json()));
        console.log(JSON.stringify(data), "success")
}
main()
  


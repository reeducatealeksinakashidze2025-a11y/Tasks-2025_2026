
// 2) შექმენით phone.js და contacts.json ფაილები, თქვენი მიზანია შექმნათ phone cli თული რომელსაც 
// ქნება დამატება, წაშლა და ყველა კონტაქტის წაკითხვის ფუნცქიონალი. node phone.js add 555151515 nika 
// უნდა დაემატოს ეს ნომერი contacts.json ში. გაითვალისწინეთ დაადოთ ვალიდაცია და თუ ნომერი არსობბს
//  არ დაამატოს იგივე ნომერი. წაშლითაც ნომერს გადასცემთ და ის ნომერი წაშლება contacts.json დან. 
// node phone.js delete 555151515. node phone.js show უნდა გაჩვენოთ ყველა კონტაქტი.
const fs = require('fs/promises')
const [, , command, phone, name] = process.argv

async function main() {

    const readDate = await fs.readFile('contacts.json', 'utf8')
    const contacts = JSON.parse(readDate)
    if (command === 'show') {
        console.log(contacts)
        return
    }
    if (command === 'add') {
        if (contacts.some(o => o.phone === phone)) {
            console.log('contact exist!!!')
            return
        }
        const contact = {
            name,
            phone
        }
        contacts.push(contact)

        await fs.writeFile('contacts.json', JSON.stringify(contacts))
        console.log('added contact successfully')
    }
    if (command === 'delete') {
        const index = contacts.findIndex(o => o.phone === phone)

        if (index === -1) {
            console.log('contact not exist!!!')
            return
        }
        contacts.splice(index, 1)
        await fs.writeFile('contacts.json', JSON.stringify(contacts))
        console.log('contact delete succsessdully')

    }



}
main()
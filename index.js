class User {
    constructor(firstName, lastName, books, pets) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.books = books,
            this.pets = pets
    }
    getFullName() {
        return (`${this.firstName} ${this.lastName}`)
    }
    addBook(bookName, author) {
        return (this.books.push({ bookName, author }))
    }
    getBooksNames() {
        const mapBookNames = this.books.map(book => book.bookName)
        console.log(`${this.getFullName()} has these books: ${mapBookNames}`)
    }
    addMascota(namePet) {
        return (this.pets.push(namePet))
    }
    countMascotas() {
        return (`${(this.firstName)} lives with ${this.pets.length} pets`)
    }
}

const test = new User("Eros", "David", [], [])

console.log(test.getFullName())
test.addMascota("Zazu"); void
test.addMascota("Wilson"); void
console.log(test.countMascotas([]))
test.addBook("El señor de las moscas", "William Golding"); void
test.addBook("Fundación", "Isaac Asimov"); void
test.getBooksNames([])
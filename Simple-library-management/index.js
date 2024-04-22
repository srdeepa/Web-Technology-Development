console.log("This is index.js");

// Constructor
function Book(name, author, type, studentName, semester, branch) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.studentName = studentName;
    this.semester = semester;
    this.branch = branch;
}

// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td>${book.studentName}</td>
                        <td>${book.semester}</td>
                        <td>${book.branch}</td>
                        <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}

// Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2 || book.studentName.length < 2 || book.semester.length < 2 || book.branch.length < 2) {
        return false
    } else {
        return true;
    }
}

Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

// Add event listener for delete buttons
let tableBody = document.getElementById('tableBody');
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        // Optionally, you can remove the book from localStorage or perform any other actions here
        // For example:
        // removeBookFromLocalStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    }
});


function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let studentName = document.getElementById('studentName').value;
    let semester = document.getElementById('semester').value;
    let branch = document.getElementById('branch').value;
    let type;
    let Academics = document.getElementById('Academics');
    let Litrature = document.getElementById('Litrature');
    let Science_and_Space= document.getElementById('Science_and_Space');

    if (Academics.checked) {
        type = Academics.value;
    } else if (Litrature.checked) {
        type = Litrature.value;
    } else if (Science_and_Space.checked) {
        type = Science_and_Space.value;
    }

    let book = new Book(name, author, type, studentName, semester, branch);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        storeBook(book); // Store book in localStorage
        display.clear();
        display.show('success', 'Your book has been successfully added');
    } else {
        // Show error to the user
        display.show('danger', 'Please fill in all the fields');
    }

    e.preventDefault();
}

// Function to store book data in localStorage
function storeBook(book) {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to retrieve book data from localStorage
function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    let display = new Display();
    books.forEach(function (book) {
        display.add(book);
    });
}

// Add a scrollbar to the table view
document.addEventListener('DOMContentLoaded', function () {
    getBooks();
    let table = document.getElementById('table');
    table.style.overflowY = 'scroll';
});

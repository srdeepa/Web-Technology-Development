console.log("This is index.js");

console.log('This is ES6 version of Project 2');

class Book {
    constructor(name, author, type, studentName, semester, branch) {
        this.name = name;
        this.author = author;
        this.type = type;
        this.studentName = studentName;
        this.semester = semester;
        this.branch = branch;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.studentName}</td>
                            <td>${book.semester}</td>
                            <td>${book.branch}</td>
                            <td>${book.type}</td>
                            <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// Add delete event listener to table
let table = document.getElementById('tableBody');
table.addEventListener('click', deleteBook);

function deleteBook(e) {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.parentElement.remove();
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let Academics = document.getElementById('Academics');
    letvLitrature  = document.getElementById('Litrature');
    let Science_and_Space = document.getElementById('Science_and_Space');

    if (Academics.checked) {
        type = Academics.value;
    }
    else if (Litrature.checked) {
        type =Litrature .value;
    }
    else if (Science_and_Space.checked) {
        type =Science_and_Spacea.value;
    }

    let studentName = document.getElementById('studentName').value;
    let semester = document.getElementById('semester').value;
    let branch = document.getElementById('branch').value;

    let book = new Book(name, author, type, studentName, semester, branch);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry, you cannot add this book');
    }

    e.preventDefault();
}

let myLibrary = []; // Array to store the books


//Constructor function for creating Book Objects
function Book(title, author, status) {
    this.title = title;
    this.author = author; 
    this.status = status;
}


//Creating the book elements
function render() {
    let tableBody = document.querySelector(".table-body");
    tableBody.innerHTML = "";

    for(let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookRow = document.createElement("tr");

        bookRow.innerHTML = `
            <td>${i + 1}.</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button onclick="readStatus(${i})" class="status-btn">
                    ${book.status}
                <button>
            </td>
            <td>
                <i class="material-symbols-outlined" id="delete-btn" onclick="deleteBook(${i})">
                    delete
                </i>
            </td>   
        `
        tableBody.appendChild(bookRow);
    }
}

//Load Books from local storage when the page loads
document.addEventListener("DOMContentLoaded", function() {
    
    //Check if myLibrary is present in local Storage
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    render();
});


function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let status = document.querySelector("#status").value;

    let newBook = new Book(title, author,status);
    myLibrary.push(newBook);

    //Save myLibrary to local storage
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    //Reset form fields
    title.value = "";
    author.value = "";
    status.value = "Read";

    render();
}

function deleteBook(index) {
   myLibrary.splice(index, 1);

   //save updated myLibrary to local storage
   localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    render();
}


//prototype method to toggle the read status of a book
Book.prototype.read = function() {
    this.status = this.status === "Read" ? "Not Read" : "Read";
}

//function that updates the read status of a book
function readStatus(index) {
    myLibrary[index].read();

    let statusBtn = document.querySelector(`.status-btn:nth-child(${index + 1})`)

    if (myLibrary[index].status == " Not Read") {
        statusBtn.style.backgroundColor = "#DC343B";
        statusBtn.style.outline = "1px solid #DC343B";
    }
    else {
        statusBtn.style.backgroundColor = "";
        statusBtn.style.outline = "1px solid #000"
    }

    render();
}

//Load Books from local storage when the page loads
document.addEventListener("DOMContentLoader", function() {
    
    //Check if myLibrary is present in local Storage
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    render();
})





//Event Listeners for displaying and closing the form
let addBtn = document.querySelector(".add-btn");
let formContainer = document.querySelector(".form-container");
let closeBtn = document.querySelector("#close-btn");
let submitBtn = document.querySelector("#submit-btn");
let bookForm = document.querySelector(".book-form");

addBtn.addEventListener("click", function() {
    formContainer.style.display = "block";
});

closeBtn.addEventListener("click", function() {
    formContainer.style.display = "none"
});

//Event Listener for submitting the form
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addBookToLibrary();
    formContainer.style.display = "none";
});
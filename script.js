document.addEventListener("DOMContentLoaded", () => {
    let booksList = [];

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readStatus = document.querySelector('#readStatus').value;

    // Class definition for Book
    class Book {
        constructor(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
    }

    // Function to load books from local storage
    const loadFromLocalStorage = () => {
        const content = JSON.parse(localStorage.getItem("booksList"));
        booksList = Array.isArray(content) ? content : [];
    }

    // Function to save books to local storage
    const saveToLocalStorage = () => {
        localStorage.setItem('booksList', JSON.stringify(booksList));
    }

    // Function to add a book to the library
    const addBook = (book) => {
        booksList.push(book);
        saveToLocalStorage();
        render();
    }

    const editBook = (index) => {
        const book = booksList[index];
        title.value = book.title;
        author.value = book.author;
        pages.value = book.pages;
        readStatus.value = book.read;

        saveToLocalStorage();
        render();
    }

    // Function to delete a book
    const deleteBook = (index) => {
        booksList.splice(index, 1);
        saveToLocalStorage();
        render();
    }

    // Function to render books in the UI
    const render = () => {
        let bookListSection = document.querySelector('.book_list_section');
        bookListSection.innerHTML = "";

        booksList.forEach((book, index) => {
            let bookCard = document.createElement("div");
            bookCard.classList.add('book_card');

            bookCard.innerHTML = `
                <h3 class="book_title">${book.title}</h3>
                <p class="book_author">${book.author}</p>
                <p class="book_pages">${book.pages} pages</p>

                <div>
                    <button class="pry-btn edit_btn">Edit</button>
                    <button class="sec-btn del_btn">Delete</button>
                </div>
            `;

            bookCard.querySelector('.del_btn').addEventListener('click', () => {
                deleteBook(index);
            });

            bookCard.querySelector('.edit_btn').addEventListener('click', () => {
                editBook(index)
                formControl();
            })

            bookListSection.appendChild(bookCard);
        });
    }

    // Initial load from local storage and render
    loadFromLocalStorage();
    render();

    // Function to handle adding a book from the form
    const addBookToLibrary = () => {
        let newBook = new Book(title, author, pages, readStatus);
        addBook(newBook);

        // Clear form fields
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#pages').value = "";
        document.querySelector('#readStatus').value = "null";
    }

    // Functionality to open and close the book form
    const addBtn = document.querySelector('#add-book-btn');
    const cancelBtn = document.querySelector('#cancel-btn');
    const confirmBtn = document.querySelector('#confirm-btn');

    let formOpen = false;
    const formControl = () => {
        const addBookSection = document.querySelector('.add_book_section');
        formOpen = !formOpen;

        if (formOpen) {
            addBookSection.style.top = '0';
        } else {
            addBookSection.style.top = '-100%';
        }
    }

    // Event listeners for opening and closing the form
    addBtn.addEventListener('click', formControl);
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formControl();
    });
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addBookToLibrary();
        formControl();
    });
});
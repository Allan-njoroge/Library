document.addEventListener("DOMContentLoaded", () => {
    // let booksList = [];
    let message;

    // class function
    class Book{
        // Book constructor functions
        constructor(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
    }
    
    class Library{
        constructor() {
            this.booksList = []
            this.loadFromLocalStorage();
        }

        // load books from local storage
        loadFromLocalStorage = () => {
            const content = JSON.parse(localStorage.getItem("booksList"))
            if(!content){
                this.booksList = [];
                return;
            }
            this.booksList = content;
        }

        // save books to local storage
        saveToLocalStorage = () => {
            localStorage.setItem('booksList', JSON.stringify(this.booksList));
        }

        // Add books
        addBook = (book) => {
            this.booksList.push(book);
            this.saveToLocalStorage();
            this.render();
        }

        // delete book
        deleteBook = (index) => {
            console.log('book deleted')
            this.booksList.splice(index,1);
            this.saveToLocalStorage();
            this.render()
        }

        //edit book

        // render books
        render = () => {
            let bookListSection = document.querySelector('.book_list_section');
            bookListSection.innerHTML = "";

            for(let i=0; i<this.booksList.length; i++) {
                let book = this.booksList[i]
                let bookCard = document.createElement("div")
                bookCard.classList = 'book_card'

                bookCard.innerHTML = `
                    <h3 class="book_title">${Book.title}</h3>
                    <p class="book_author">${Book.author}</p>
                    <p class="book_pages">${Book.pages}</p>
        
                    <div>
                        <button class="pry-btn edit-btn">Edit</button>
                        <button class="sec-btn del_btn">Delete</button>
                    </div>
                `

                bookCard.querySelector('.del_btn').addEventListener('click', () => {
                    this.deleteBook(i);
                })

                bookListSection.append(bookCard);
            } 
        }
    }

    const library = new Library()
    library.render()

    // function to add book to library
    const addBookToLibrary = () => {
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const readStatus = document.querySelector('#readStatus').value;

        let newBook = new Book(title, author, pages, readStatus)
        console.log(newBook)
        library.addBook(newBook)

        title.value = "";
        author.value = "";
        pages.value = "";
        readStatus.value = "null";
    }

    // functionality to open and close the book form
    const addBtn = document.querySelector('#add-book-btn');
    const confirmBtn = document.querySelector('#confirm-btn');
    const cancelBtn = document.querySelector('#cancel-btn');


    let formOpen = false;
    const formControl = () => {
        const addBookSection = document.querySelector('.add_book_section');
        formOpen = !formOpen

        if(formOpen === true) {
            addBookSection.style.top = '0';
        } else {
            addBookSection.style.top = '-100%';
        }
    }

    // add book function
    addBtn.addEventListener('click', () => {
        formControl()
    })

    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault()
        formControl()
    })

    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault()
        addBookToLibrary()
        formControl()
    })
})
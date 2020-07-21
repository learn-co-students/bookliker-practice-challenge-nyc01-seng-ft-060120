document.addEventListener("DOMContentLoaded", function() {
    const booksUrl = "http://localhost:3000/books/"
    const listPanel = document.querySelector('#list-panel')
    const showPanel = document.querySelector('#show-panel')
    const ulList = listPanel.querySelector('#list')
    const me = {"id":1, "username":"pouros"}
    
    // console.log()

    const fetchBooks = () => {
        fetch(booksUrl)
        .then( response => response.json() )
        .then( books => renderBooks(books) )
    }

    const renderBooks = (books) => {
        books.forEach( book => 
            renderBook(book)
        )
    }

    const renderBook = (book) => {
        const bookLi = document.createElement('li')
        bookLi.innerText = book.title
        ulList.append(bookLi)
        bookLi.addEventListener('click',(e) => showBookInPanel(e, book, bookLi)
        )
    }
    
    const showBookInPanel = (e, book, bookLi) => {
        
        showPanel.innerHTML = `
        <img src=${book.img_url}>
        <h2 id="bookTitle">${book.title}</h2>
        <h3 id="bookSubtitle">${book.subtitle}</h3>
        <h3 id="bookAuthor">${book.author}</h3>
        <p id="bookDescription">${book.description}</p>
        <ul id="userUl">        
        </ul>
        `
        const likeButton = document.createElement('button')
        likeButton.innerText = "LIKE"
        showPanel.append(likeButton)
        likeButton.addEventListener('click', (e) => addLike(e,likeButton,book))

        getUsers(book)
        
    }

    function getUsers(book){
        const userUl = document.querySelector('#userUl')
        userUl.innerHTML = ""
      
        book.users.forEach(usersObj => {
            // renderUsers(usersObj) 
            const userLi = document.createElement('li')
            userLi.innerText = usersObj.username
            userUl.append(userLi)
        })    
    }


    function addLike(e,likeButton,book){
        if (book.users.includes(me)){
            return
        }
        let listOfUsers = book.users
        listOfUsers.push(me)
        console.log(listOfUsers)
        
        fetch(booksUrl + book.id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                users: listOfUsers
            })
        })
        .then(resp => resp.json())
        .then(book => getUsers(book))  
    }




    // INVOKE FUNCTIONS
    fetchBooks();
   



    }
);

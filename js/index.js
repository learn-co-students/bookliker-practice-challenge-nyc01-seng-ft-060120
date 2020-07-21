document.addEventListener("DOMContentLoaded", () => {

    const booksUrl = 'http://localhost:3000/books'
    const usersUrl = 'http://localhost:3000/users'
    const listPanel = document.getElementById('list-panel')
    const booksContainer = document.getElementById('list')
    const thumbnailContainer = document.getElementById('show-panel')
    let booksArray
    let usersArray
    
    const fetchBooks = () => {

        fetch(booksUrl)
        .then(response => response.json())
        .then(booksObject => {
            booksArray = booksObject,
            booksArray.forEach(book => renderBooks(book)),
            renderThumbnail(booksArray)
        })
    }

    const fetchUsers = () => {

        fetch(usersUrl)
        .then(response => response.json())
        .then(usersObject => {
            usersArray = usersObject
        })
    }

    const renderBooks = (book) => {

        const bookLi = document.createElement('li')
        bookLi.textContent = `${book.title}`
        bookLi.className = 'book-li'
        bookLi.dataset.id = book.id

        booksContainer.append(bookLi)
        listPanel.append(booksContainer)

    }

    const renderThumbnail = (booksArray) => {
        booksContainer.addEventListener('click', (e) => {
            let bookNow = booksArray.find(book => book.id == e.target.dataset.id)
            makeBookDiv(bookNow)
        })

    }

    const makeBookDiv = (bookNow) => {
        thumbnailContainer.innerHTML = ``

        const thumbnailView = document.createElement('div')
        thumbnailView.innerHTML = `
             <img src="${bookNow.img_url}">
        `

        const bookTitle = document.createElement('h3')
        bookTitle.textContent = bookNow.title

        const bookAuthor = document.createElement('h3')
        bookAuthor.textContent = bookNow.author 

        const bookSubtitle = document.createElement('h3')
        bookSubtitle.textContent = bookNow.subtitle 

        const bookDescription = document.createElement('p')
        bookDescription.textContent = bookNow.description

        const bookUsers = document.createElement('ul')
        bookUsers.className = 'book-users'
        bookNow.users.forEach(user => {
            const userLi = document.createElement('li')
            userLi.textContent = user.username
            bookUsers.append(userLi)  
            })

        let bookNowUsers = bookNow.users.map(user => user.id)
        const likeBookButton = document.createElement('button')
        likeBookButton.dataset.id = bookNow.id
        if (bookNowUsers.includes(1)) {
            likeBookButton.innerText = "UNLIKE"
        } else {
            likeBookButton.innerText = "LIKE"
        }
    
        thumbnailContainer.append(
            thumbnailView, 
            bookTitle, 
            bookSubtitle, 
            bookAuthor, 
            bookDescription, 
            bookUsers, 
            likeBookButton
        )

        likeBook(likeBookButton)
    }

    const likeBook = (likeBookButton) => {
        likeBookButton.addEventListener('click', (e) => {
            
            e.preventDefault()
            console.log(usersArray)
            
            let bookNow = booksArray.find(book => book.id == e.target.dataset.id)
            let bookNowUsers = bookNow.users.map(user => user.id)
            console.log(bookNowUsers)
            bookNowUsers.find(user => user.id )
            e.target.innerText = ( e.target.innerText === "LIKE" ) ? "UNLIKE" : "LIKE"

            const noUserOne = bookNow.users.filter(user => user.id != 1)
            console.log(noUserOne)

            newStatus = (e.target.innerText === "UNLIKE") ?  bookNow.users : noUserOne
            fetch(`${booksUrl}/${bookNow.id}`, {
                method: "PATCH",
                headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
                body: JSON.stringify({users: newStatus})
            })
            
        })
    }
    

    fetchUsers()
    fetchBooks()

});

document.addEventListener("DOMContentLoaded", function() {

    // - Get a list of books & render them
    // `http://localhost:3000/books`

    getBooks()

    function getBooks(){
        fetch('http://localhost:3000/books')
        .then(r => r.json())
        .then(books => renderBooks(books))
    }

    function renderBooks(books){
        books.forEach(book =>{
            const bookList = document.querySelector("#list")
            const bookLi = document.createElement('li')
            bookLi.id = book.id
            bookLi.textContent = `${book.title}`
            bookList.append(bookLi)
            document.addEventListener('click', function(e){
                if (e.target.id === bookLi.id){
                    showBook(book)
                }
            })
        })
    }

    // - Be able to click on a book, you should see the book's thumbnail and description 
    //     and a list of users who have liked the book.

    function showBook(book){
        const bookDiv = document.querySelector("#show-panel")
        bookDiv.innerHTML = `
        <img src=${book.img_url}>
        <p>${book.description}</p>
        <ul id=book-ul></ul>
        <button id=${book.id} name=like-btn>Like</button>`
        const bookUl = document.getElementById('book-ul')
            book.users.forEach(user =>{
                let bookLi = document.createElement('li')
                bookLi.innerHTML =`
                ${user.username}`
                bookUl.append(bookLi)
            })
        let likeBtn = document.getElementsByName("like-btn")[0]
        likeBtn.addEventListener('click', function(){
                addLikes(book)
            })
    }

    // - You can like a book by clicking on a button. You are user 1 `{"id":1, "username":"pouros"}`, 
    //     so to like a book send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book. 
    //     This array should be equal to the existing array of users that like the book, plus your user. For example, 
    //     if the previous array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"maverick"}]`, 
    //     you should send as the body of your PATCH request:
    
    function addLikes(book){
        //send a patch request to book.id
        //add an element to array of book.users
        //push 
        console.log(book)
        book.users.push({"id":1, "username":"pouros"})
        let id = book.id
        fetch(`http://localhost:3000/books/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book.users)
        })
        showBook(book)
    }

    // - This route will respond with the updated book json including the list of users who have liked the book.


    // - BONUS: Can you make it so a second patch request to the same book removes your user from the list of users? 
    //     Can you toggle likes on and off?

});

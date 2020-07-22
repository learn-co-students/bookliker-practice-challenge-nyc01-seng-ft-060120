document.addEventListener("DOMContentLoaded", function() {

const baseUrl = `http://localhost:3000/books`
const masterList = document.getElementById('list')
const bookShowPanel = document.getElementById('show-panel')

function fetchBooks(){
    fetch(baseUrl)
    .then(response => response.json())
    .then(books => renderBooks(books))
}

function renderBooks(books){
    books.forEach(book => renderBook(book))
}

function renderBook(book){
    const bookLi = document.createElement('li')
    bookLi.innerText = book.title
    bookLi.dataset.id = book.id
    masterList.append(bookLi)
    bookLi.addEventListener('click', function(e){
        bookImg = document.createElement('img')
        bookImg.src = book.img_url
        bookDescription = document.createElement('p')
        bookDescription.innerText = book.description
        const likeButton = document.createElement('button')
        likeButton.innerText = 'Like'
        likeButton.dataset.id = book.id
        bookShowPanel.append(bookImg, bookDescription, likeButton)

        addBookLikes(book.users)
            
    })
}

function addBookLikes(users){
    users.forEach(user => {
       const userLike = document.createElement('li')
       userLike.innerText = user.username
       bookShowPanel.append(userLike)
    })
    let likeButton = document.querySelector('button')
    likeButton.addEventListener('click', function(e){
        e.preventDefault()
        const pouros = {"id":1, "username":"pouros"}
        users.push(pouros)
        body = {users}
        id = likeButton.dataset.id
        fetch(`http://localhost:3000/books/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
            
        })
        .then(response => response.json())
        .then(book => renderBook(book))
        
    })

    
}



fetchBooks()



});


// 3rd deliverable:
// Add ID to likeButton so that I'm able to access ID for the Patch Request
// create a listener on the LikeButton (thinking of adding with addBookLikes function so that I can keep access of users who have already Liked) check
// when button is clicked it should start a Patch Request
// Body of the Patch request should be all Users plus me {"id":1, "username":"pouros"}
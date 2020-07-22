const URL = 'http://localhost:3000/'
const BOOK_URL = URL + 'books/'
const USER_URL = URL + 'users/'
const CURRENT_USER = {id: 1, username: "Shiro"}

let fetchBooks = () => {
    return fetch(BOOK_URL)
    .then(res => res.json())
    .then(books => renderBookList(books))
}

let renderBookList = (books) => {
    let ul = document.querySelector('#list')
    books.forEach(book => {
        let li = document.createElement('li')
        li.textContent = book.title
        li.dataset.id = book.id
        li.addEventListener('click', (e) => {fetchBook(e.target.dataset.id)})
        ul.appendChild(li)
    })
}

let fetchBook = (id) => {
    return fetch(BOOK_URL+id)
    .then(res => res.json())
    .then(book => renderBook(book))
}

let renderBook = (book) => {
    let showPanel = document.querySelector('#show-panel')
    showPanel.dataset.id = book.id
    showPanel.innerHTML = `
        <img src=${book.img_url}>
        <h2>${book.title}</h2>
        <h3>${book.subtitle}</h3>
        <h4>Author: ${book.author}</h4>
        <p>${book.description}</p>
        <h5>Users Who Liked This Book:</h5>
        <ul></ul>
        <button>${book.users.some(user => user.id === CURRENT_USER.id) ? "UnLike" : "Like" }</button>
    `
    let userList = showPanel.querySelector('ul')
    book.users.forEach(user => {
        let li = document.createElement('li')
        li.textContent = user.username
        userList.appendChild(li)
    })
    let likeBttn = showPanel.querySelector('button')
    likeBttn.addEventListener('click', (e) => {
        if (e.target.textContent === 'Like'){fetchUsersLike(e.target.parentElement.dataset.id)}
        else {fetchUsersUnLike(e.target.parentElement.dataset.id)}
    })
}

let fetchUsersLike = (id) => {
    return fetch(BOOK_URL+id)
    .then(res => res.json())
    .then(book => patchLike(id, book.users))
}

let fetchUsersUnLike = (id) => {
    return fetch(BOOK_URL+id)
    .then(res => res.json())
    .then(book => patchUnLike(id, book.users))
}

let patchLike = (id, userArray) => {
    userArray.push(CURRENT_USER)
    return fetch(BOOK_URL+id, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            users: userArray
        })
    })
    .then(res => res.json())
    .then(book => renderBook(book))
}

let patchUnLike = (id, userArray) => {
    let filteredUsers = userArray.filter(user => user.id !== CURRENT_USER.id)
    return fetch(BOOK_URL+id, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            users: filteredUsers
        })
    })
    .then(res => res.json())
    .then(book => renderBook(book))
}

document.addEventListener("DOMContentLoaded", () => {
    fetchBooks()
});

const showPanel = document.querySelector('#show-panel')
const books_url = 'http://localhost:3000/books/'
let currentUser = {'id':1, "username":"pouros"}

const fetchBooks = () => {
  fetch(books_url)
  .then(resp => resp.json())
  .then(books => {
    renderBooks(books)
  })
} 

const renderBooks = (books) => {
  books.forEach(book => renderBookList(book))
}

const renderBookList = (book) => {
  const bookTitle = document.createElement('li')
  const listPanel = document.querySelector('#list-panel')

  bookTitle.innerHTML = book.title 
  bookTitle.dataset.id = book.id

  listPanel.append(bookTitle)
  displayBookBtnListener(bookTitle, book)
}

const displayBookBtnListener = (bookTitle, book) => {
  bookTitle.addEventListener('click', () => {
    displayBook(book)
  })
}

const displayBook = (book) => {
  showPanel.innerHTML = ''
  const bookDiv = document.createElement('div')
  const bookImg = document.createElement('img')
  const bookTitle = document.createElement('h2')
  const bookDescription = document.createElement('p')

  bookTitle.innerHTML = book.title
  bookImg.src = book.img_url
  bookDescription.innerHTML = book.description

  bookDiv.append(bookImg, bookTitle, bookDescription)
  showPanel.append(bookDiv)

  renderLikeBtn(book)
  renderUsers(book.users)
}

const renderUsers = (users) => {
  users.forEach(user => renderUser(user))
}

const renderUser = (user) => {
  const userLi = document.createElement("li");
  
  userLi.innerHTML = user.username;
  userLi.dataset.userId = user.id;
  showPanel.append(userLi);
};

const renderLikeBtn = (book) => {
  const likeBtn = document.createElement('button')
  showPanel.append(likeBtn)
  if (!!book.users.find((user) => user.id === currentUser.id)) {
    likeBtn.innerText = "UNLIKE";
  } else {
    likeBtn.innerText = 'LIKE'
  }
  likeBtn.dataset.bookId = book.id
  likeBtnHandler(likeBtn, book.users)
}

const likeBtnHandler = (button, users) => {
  button.addEventListener('click', () => addUser(button, users))
}

const addUser = (button, users) => {
  if (button.innerText === "UNLIKE") {
    users = users.filter(user => user.id != 1)
    fetch(books_url + `${button.dataset.bookId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ users: users }),
    })
      .then((resp) => resp.json())
      .then((book) => displayBook(book));
  } else {
    users.push(currentUser);
    fetch(books_url + `${button.dataset.bookId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({users: users}),
    })
    .then(resp => resp.json())
    .then((book) => displayBook(book));
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  fetchBooks();
});
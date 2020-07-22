const baseURL = "http://localhost:3000/books/";
document.addEventListener("DOMContentLoaded", function() {

    const ulElement = document.getElementById('list');
    const showPanel = document.getElementById('show-panel');
    var allBooks;

    fetch(baseURL).then((response) => {return response.json()})
    .then(books => {
        allBooks = books;
        books.forEach(book => {
            loadBook(book)
        });
    });

    function getUserList(users) {
        const ulElement = document.createElement('ul');
        users.forEach(user => {
            const liElement = document.createElement('li');
            liElement.textContent = user.username;
            ulElement.appendChild(liElement);
        })
        return ulElement;
    }

    function showDetails(event) {
        showPanel.innerHTML = "";

        const targetBook = getBook(event.target.textContent);
        const bookImage = document.createElement('img');
        const title = document.createElement('h2');
        const subtitle = document.createElement('h3');
        const description = document.createElement('p');
        const author = document.createElement('h3');
        const likeButton = document.createElement('button');
        const usersElement = getUserList(targetBook.users);

        subtitle.textContent = targetBook.subtitle;
        author.textContent = targetBook.author;
        likeButton.textContent = "Like";
        description.textContent = targetBook.description;

        likeButton.addEventListener('click', (event) => toggleUsers(usersElement, targetBook));

        title.textContent = targetBook.title;
        bookImage.src = targetBook.img_url;

        showPanel.append(bookImage, title, subtitle, author, description, usersElement, likeButton);
    }
    
    function toggleUsers(usersElement, book) {
        if (book.users.find(user => user.id === 1)) {return}

        book.users.push({id: 1, username: "pouros"})
        const liElement = document.createElement('li');
        liElement.textContent = "pouros";
        usersElement.appendChild(liElement);

        fetch(baseURL + book.id, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({users: book.users})
        })
        
        
    }

    function getBook(title) {
        return allBooks.find(book => book.title === title);
    }

    function loadBook(book) {
        const bookTitle = document.createElement('li');
        bookTitle.textContent = book.title;
        bookTitle.addEventListener('click', showDetails);
        ulElement.appendChild(bookTitle);
    }
});

document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready to Rock and Roll!");

	const booksUrl = "http://localhost:3000/books";
	const usersUrl = "http://localhost:3000/users"

	//---------------------------------------------------------------

	const fetchBooks = (books) => {
		fetch(books)
			.then((response) => response.json())
			.then((bookData) => bookData.forEach((book) => renderBooks(book)));
	}; // .fetchBooks

	//---------------------------------------------------------------

	const renderBooks = (book) => {
		const bookList = document.querySelector("#list");
		const bookItem = document.createElement("li");

		bookItem.className = "book-list";
		bookItem.innerHTML += `
        ${book.title}
        `;

		bookList.append(bookItem);
	}; // .renderBooks

	//---------------------------------------------------------------

    const bookListener = (book) => {
		// console.log(book.title)
		document.addEventListener('click', e => {
			const selectedBook = e.target.innerText
			if(selectedBook === book.title){
				renderBookInfo(book)
			}
		})
	} // .bookListener
	
	//---------------------------------------------------------------

    const bookInfoFetch = (books) => {
		fetch(books)
		.then((response) => response.json())
		.then((bookData) => bookData.forEach((book) => bookListener(book)));
    } // .bookInfoRender

	//---------------------------------------------------------------

	const renderBookInfo =  (book) => {
		const showPanel = document.getElementById("show-panel")
		const showContainer = document.createElement('div')
		showContainer.className = "show-container"
		showContainer.innerHTML +=
		`
		<h1>${book.title}</h1>
		<h2>${book.subtitle}</h2>
		<h4>Written By: ${book.author}</h4>
		<img alt="" src="${book.img_url}" />
		<p>${book.description}</p>
		`
		
		showPanel.append(showContainer)
		// likes();
		
	} // .renderBookInfo

	//---------------------------------------------------------------

	const fetchUser = (users) => {
		fetch(users)
		.then((response) => response.json())
		.then((userData) => userData.forEach((user) => userLikes(user)));
	} // .bookInfoRender

	//---------------------------------------------------------------



	//---------------------------------------------------------------




	fetchBooks(booksUrl);
	bookInfoFetch(booksUrl)
	fetchUser(usersUrl)
}); // DOMContent Loaded


	// {id: 5, username: "feels-like-summer"}
		// () update Users db to have likes
	 // () display a list of the users who have liked the book
	            // () fetch users
					// () for each -> renderUser -> user.username -> if user liked book === this book -> append user.name <div class="liked"></div>







// (.) - Get a list of books & render them
// (.)  `http://localhost:3000/books`

// (.) - Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.

// () - You can like a book by clicking on a button. You are user 1 `{"id":1, "username":"pouros"}`, so to like a book send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book. This array should be equal to the existing array of users that like the book, plus your user. For example, if the previous array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"maverick"}]`, you should send as the body of your PATCH request:

//Book Object
//-------------(Ids not included)
// "title":
// "subtitle":
// "description":
// "author":
// "img_url":

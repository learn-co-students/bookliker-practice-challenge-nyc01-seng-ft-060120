document.addEventListener("DOMContentLoaded", function() {
    const booksUrl = "http://localhost:3000/books"
    const list = document.getElementById('list-panel')
    const show = document.getElementById('show-panel')
    const mainUser = {
        id: 1,
        username: "pouros"
      };


    function fetchBooks() {
       fetch(booksUrl)
       .then(resp => resp.json())
       .then(books => books.forEach(book => renderBooks(book)))
    }

    function renderBooks(book){
        const li = document.createElement("li")
        li.className = 'books'
        li.dataset.id = book.id
        li.innerHTML = `
        ${book.title}<br><br>
        `
        list.append(li)
    }

    function fetchBook(id){
        return fetch(booksUrl + `/${id}`)
        .then(resp => resp.json())
        .then(info => renderOneBook(info))
    }

    function renderOneBook(info) {
        const panel = document.createElement("class")
        panel.className = 'panel' 
        panel.dataset.id = info.id
        panel.innerHTML = `
        <h1>${info.title}</h1>
        <h2>${info.author}</h2>
        <img src=${info.img_url}>
        <h3>${info.subtitle}</h3>
        <p>${info.description}</p>
        <button id='btn'>Like</button>
        <h3>Users:<h3>
        `
        show.append(panel)

        const userList = document.createElement('p')
        userList.className = 'user-list'
        userList.innerHTML = `
        <p>${info.users.map(function(e){
            return (e.username)
        })}</p>`
        show.append(userList) 
    }

        function patchUser(id) {
            fetch(`http://localhost:3000/books/${id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                'body': JSON.stringify({
                  'user': id
                })
              })
              .then(resp => resp.json())
              // here we update the HTML a user sees on the page
              .then(console.log())
            }
    
      


    fetchBooks()




//listners

    document.addEventListener("click", function(e){
        if (e.target.matches('li')){
        fetchBook(e.target.dataset.id)
        .then(show.innerHTML="")
        }
    })


    document.addEventListener("click", function(e){
        if (e.target.matches('button')){
            e.target.innerText = "Liked"
            const userList = this.getElementsByClassName("user-list")
            console.log(userList.map)
        } 
        patchUser(id)
    })




});

document.addEventListener("DOMContentLoaded", function() {
    const BOOK_URL = 'http://localhost:3000/books'
    const bookList = document.getElementById('list')
    const bookPane = document.getElementById('show-panel')

    function buildList() {
        fetch(BOOK_URL)
            .then(resp => resp.json())
            .then(json => {
                for(const book in json) {
                    const bookLI = document.createElement('li')
                    bookLI.innerText = json[book]["title"]
                    bookLI.dataset.id = json[book]["id"]
                    bookList.append(bookLI)
                }
            })
    }

    function displayBookInfo(bookID) {
        fetch(`${BOOK_URL}/${bookID}`)
            .then(resp => resp.json())
            .then(json => {
                bookPane.innerHTML = `
                    <img src="${json["img_url"]}" alt="Book thumbnail">
                    <h3>${json["title"]}</h3>
                    <h4>${json["subtitle"]}</h4>
                    <h4>Written By: ${json["author"]}</h4>
                    <p>${json["description"]}</p>
                    <ul id="fans"></ul>
                `
                const fans = document.getElementById('fans')
                for (const fan in json["users"]) {
                    const fanLI = document.createElement('li')
                    fanLI.innerText = json["users"][fan]["username"]
                    fanLI.dataset.id = json["users"][fan]["id"]
                    fans.append(fanLI)
                }
                const likeBTN = document.createElement('button')
                likeBTN.dataset.id = json["id"]
                if (fans.innerText.includes("pouros")) {
                    likeBTN.innerText = "UNLIKE"
                } else {
                    likeBTN.innerText = "LIKE"
                }
                bookPane.append(likeBTN)
            })
    }

    function likeOrDislike(bookBTN) {
        const likeArray = new Array
        const fans = document.getElementById('fans')
        for (let i = 0; i < fans.children.length; i++) {
            likeArray.push({
                id: fans.children[i].dataset.id, 
                username: fans.children[i].innerText
            })
        }
        if (bookBTN.innerText === "UNLIKE") {
            for (const fan in likeArray) {
                if (likeArray[fan]["id"] === "1") {
                    likeArray.splice(fan, 1)
                }
            }
        } else {
            likeArray.push({
                id: 1, 
                username: "pouros"
            })
        }
        updateLikes(bookBTN.dataset.id, likeArray)
    }

    function updateLikes(bookID, array) {
        let formData = {
            users: array
        }
        let configObj = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(formData)
        }
        fetch(`${BOOK_URL}/${bookID}`, configObj)
            .then(resp => resp.json())
            .then(json => {
                displayBookInfo(json["id"])
            })
    }

    buildList()

    bookList.addEventListener('click', function(e) {
        displayBookInfo(e.target.dataset.id)
    })

    bookPane.addEventListener('click', function(e) {
        likeOrDislike(e.target)
    })
});

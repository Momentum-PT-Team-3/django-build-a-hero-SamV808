console.log("js loaded")


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


let heroBoard = document.querySelector("#hero-table")
const heroURL = "api/heroes/"
let heroDisplay = document.querySelector("#hero-display")

function heroList(url) {
    fetch(heroURL, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-Request-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
        },

    })
        .then(response => {
            return response.json()
        })
        .then(heroArray => {
            console.log(heroArray)
            console.log(heroDisplay)
            for (let hero of heroArray) {
                console.log(hero)
                let heroEl = document.createElement("li")
                heroEl.innerText = `${hero.name} | ${hero.alias}`
                let deleteButton = document.createElement("button")
                deleteButton.innerText = "X"
                deleteButton.classList.add("button", "is-danger", "is-small")
                deleteButton.setAttribute("data-pk", hero.pk)
                heroEl.append(deleteButton)
                heroEl.setAttribute("id", hero.pk)
                heroDisplay.appendChild(heroEl)
                deleteButton.addEventListener("click", event => {
                    console.log(event.target.dataset.pk)
                    fetch(`api/heroes/${event.target.dataset.pk}`, {
                        method: 'DELETE',
                        credentials: 'same-origin',
                        headers: {
                            'Accept': 'application/json',
                            'X-Request-With': 'XMLHttpRequest',
                            'X-CSRFToken': csrftoken,
                        },
                    })
                    .then(response => {
                        console.log(event.target.parentElement.id)
                        let elementToRemove = document.getElementById(event.target.dataset.pk)
                        console.log(elementToRemove)
                        elementToRemove.remove()
                    })
                })

            }
        })

}

function addHero(url) {
    let heroForm = document.querySelector("#hero-form")
    heroForm.addEventListener("submit", function (event) {
        event.preventDefault()
        console.log(event.target)
        let heroFormData = new FormData(heroForm)
        console.log(heroFormData)
        fetch(heroURL, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "X-CSRFToken": csrftoken,
            },
            body: heroFormData,
        })
            .then(response => {
                return response.json()
            })
            .then(newHero => {
                console.log(newHero)
                let heroItem = document.createElement("li")
                heroItem.innerText = `${newHero.name} | ${newHero.alias}`
                heroDisplay.appendChild(heroItem)
            })
    })

}

const modal =
    document.querySelector('.modal');
const btn =
    document.querySelector('#btn')
const close =
    document.querySelector('.modal-close')

btn.addEventListener('click',
    function () {
        modal.style.display = 'block'
    })

close.addEventListener('click',
    function () {
        modal.style.display = 'none'
    })

window.addEventListener('click',
    function (event) {
        if (event.target.className ===
            'modal-background') {
            modal.style.display = 'none'
        }
    })
heroList(heroURL)
addHero(heroURL)








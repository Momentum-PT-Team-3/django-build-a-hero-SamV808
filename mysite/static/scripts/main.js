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

fetch(heroURL, {
    method: 'GET',
    credentials: 'same-origin',
    headers:{
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
        let heroDisplay = document.querySelector("#hero-display")
        console.log(heroDisplay)
        for (let hero of heroArray){
            console.log(hero)
           let heroEl = document.createElement("li")
            heroEl.innerText = `${hero.name} | ${hero.alias}`
            heroDisplay.appendChild(heroEl)
        }
    })


let heroForm = document.querySelector("#hero-form")
heroForm.addEventListener("submit", function (event){
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
        .then(data => {
            console.log(data)
        })
        document.location.reload()
})





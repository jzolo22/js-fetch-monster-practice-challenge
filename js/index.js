// when page loads aka right away 
// show firt 50 monsters via GET request using fetch 
// display it on the DOM
// THEN find next button
// listen for a click event
// load next 50 using a GET request 
// ~interpolate~
// challenge: dropdown to choose how many per page

// ------------------Variables------------------ //


const monstersContainer = document.querySelector("div#monster-container")
const createMonsterDiv = document.querySelector("div#create-monster")
const newMonsterForm = document.createElement("form")

const nextButton = document.querySelector("button#forward")
const backButton = document.querySelector("button#back")

let numPage = 1


// ------------------Function Definitions------------------ //


function renderPage(numPage) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${numPage}`)
    .then(response => response.json())
    .then(monstersArray => monstersArray.forEach(monsterObj => {
        renderMonster(monsterObj)
    }))
}

function renderMonster(monsterObj) {
    const newMonsterDiv = document.createElement("div")
    newMonsterDiv.innerHTML = `
        <h2>${monsterObj.name}</h2>
        <h4>Age: ${monsterObj.age}</h4>
        <p>Bio: ${monsterObj.description}</p>`
    monstersContainer.append(newMonsterDiv)
}

function addForm() {

    const nameInput = document.createElement("input")
    nameInput.setAttribute ("type", "text")
    nameInput.setAttribute ("name", "name")
    nameInput.setAttribute ("placeholder", "Name...")

    const ageInput = document.createElement("input")
    ageInput.setAttribute ("type", "number")
    ageInput.setAttribute ("name", "age")
    ageInput.setAttribute ("placeholder", "Age...")

    const descriptionInput = document.createElement("input")
    descriptionInput.setAttribute ("type", "text")
    descriptionInput.setAttribute ("name", "description")
    descriptionInput.setAttribute ("placeholder", "Description...")

    const submitButton = document.createElement("input")
    submitButton.setAttribute ("type", "submit")
    submitButton.setAttribute ("value", "Submit")

    newMonsterForm.append(nameInput, ageInput, descriptionInput, submitButton)
    createMonsterDiv.append(newMonsterForm)
}

// function addDropdown() {
//     const dropdown = document.createElement("select")
//     dropdown.name = "How many monsters?"
    

//     createMonsterDiv.append(dropdown)

// }


function initialize() {
    renderPage(numPage)
    addForm()
}




// ------------------Event Listeners------------------ //

nextButton.addEventListener("click", event => {
    renderPage(numPage += 1)
})

backButton.addEventListener("click", event => {
    renderPage(numPage -= 1)
    console.log(numPage)
})

newMonsterForm.addEventListener("submit", event => {
    event.preventDefault()

    const newMonsterObj = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMonsterObj)
    })
    .then(response => response.json())
    .then(newMonsterObj => renderMonster(newMonsterObj))
    
})



// ------------------Initialize Page------------------ //

initialize()
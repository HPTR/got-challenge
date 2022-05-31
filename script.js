import charactersArr from "./data/data.js";

const cardContainer = document.querySelector('.card-container');
const allCheckboxes = document.querySelectorAll('.navbar__checkbox');
const searchInput = document.querySelector('.navbar__search');

const checkedArray = [];

const generateCards = (arr) => {
    const cards = arr.map(character => {
        return (`
            <div class="card">
                <h2 class="card__name">${character.fullName}</h2>
                <img class="card__image" src="${character.imageUrl}">
                <h3 class="card__house">House: ${character.family}</h3>
                <h4 class="card__title">Title: ${character.title}</h4>
            </div>
        `);
    });
    cardContainer.innerHTML = cards.join('')
}

generateCards(charactersArr);

const getSearchInput = (event) => {
    return event.target.value;
}

const filterBySearch = event => {
    const searchTerm = getSearchInput(event).toLowerCase();
    const filteredArray = charactersArr.filter(character => character.fullName.toLowerCase().includes(searchTerm));
    generateCards(filteredArray);
}

const addToCheckboxArray = event => {
    if (!checkedArray.includes(event.target.name)) {
        checkedArray.push(event.target.name)
    } else {
        checkedArray.splice(checkedArray.indexOf(event.target.name), 1);
    }
    console.log(checkedArray);
}

const filterByCheckbox = event => {
    addToCheckboxArray(event)
    const filteredArrayByCheckbox = charactersArr.filter(character => character.family.toLowerCase().split(' ').includes(checkedArray[0]) || character.family.toLowerCase().split(' ').includes(checkedArray[1]) || character.family.toLowerCase().split(' ').includes(checkedArray[2]) || character.family.toLowerCase().split(' ').includes(checkedArray[3]));
    checkedArray.length === 0 ? generateCards(charactersArr) : generateCards(filteredArrayByCheckbox);
}

searchInput.addEventListener('input', getSearchInput);
searchInput.addEventListener('input', filterBySearch);
allCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterByCheckbox));
console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', init)
function init() {
    const listItems = document.querySelector('ul#dog-breeds')
    const selection = document.querySelector('#breed-dropdown')
    const breedArray = document.getElementsByClassName('main_breed')

    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(data => renderImage(data.message)
    )

    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(data => renderDogList(data.message))

    listItems.addEventListener('click', (e) => {
        e.target.style.color = 'pink'
    })

    selection.addEventListener('change', (e) => {
        const length = breedArray.length
        for (i = 0; i < length; i++) {
            console.log(e.target.value)
            console.log(breedArray[i].textContent)
            if (e.target.value !== breedArray[i].textContent.charAt(0)) {
                breedArray[i].style.display = 'none'
            } else {
                breedArray[i].style.display = ''
            }
        }
    })
}

function renderImage(input) {
    const div = document.querySelector('#dog-image-container')
    input.forEach(piece => {
        const img = document.createElement('img')
        img.src = piece
        img.style.width = '25%'
        div.append(img)
    });
}

function renderDogList(input) {
    const ul = document.querySelector('#dog-breeds')
    for (const breed in input) {
        const li = document.createElement('li')
        li.textContent = breed
        li.classList.add('main_breed')
        if (input[breed].length > 0) {
            const subList = document.createElement('ul')
            input[breed].forEach((subBreed) => {
                const subItem = document.createElement('li')
                subItem.textContent = subBreed
                subList.appendChild(subItem)
            })
            li.appendChild(subList)
        }
        ul.appendChild(li)
    }
}
console.log('Client side Js is been Loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msgOne.textContent = 'Loading....'
    msgTwo.textContent = ''

    fetch('http://localhost:5555/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent =data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forcast
                // console.log(data.location)
                // console.log(data.forcast)
            }
        })
    })
})
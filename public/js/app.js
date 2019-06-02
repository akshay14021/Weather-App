document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const searchLocation = document.querySelector('input').value
    document.querySelector('#message2').textContent = ''
    fetch(`/weather?address=${searchLocation}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector('#message1').textContent = data.error
            } else {
                document.querySelector('#message1').textContent = data.location
                document.querySelector('#message2').textContent = data.forecast
            }
        })
    })
})



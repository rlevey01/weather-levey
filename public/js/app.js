const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value


  messageOne.textContent = 'Loading ...';

  messageTwo.textContent = ''
  getData()
    .catch(error => {
      messageOne.textContent = 'Unable to find location. Try another search.'
    })
  async function getData() {

    const response = await fetch('/weather?address=' + location)
    let weather = await response.text()
    originalWeather = weather
    let weather1 = weather
    weather = weather.replace('{', '')
    weather = weather.replace('}', '')



    if (weather === '"error":"You must enter an address"') {
      messageOne.textContent = "You must enter an address"
      messageTwo.textContent = ''
    } else if (weather === 'Unable to find location. Try another search.') {
      messageOne.textContent = 'Unable to find location. Try another search.'
      messageTwo.textContent = ''
    } else {

      a = JSON.parse(originalWeather)
      // messageOne.textContent = ''
      // messageTwo.textContent = (a.location +
      //   '\r\n' + a.forecast)
      document.getElementById('message-2').innerHTML =
        a.location +
        '<br>' + a.forecast
      messageOne.textContent = ''
    }
  }
  //   document.getElementById('text1').innerText = weather
})
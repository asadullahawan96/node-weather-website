const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('1')
const messageTwo = document.getElementById('2')

weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?search='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent =data.temperature

        }
    })
})
})
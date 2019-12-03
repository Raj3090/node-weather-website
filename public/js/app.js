console.log("client side javascript is loaded")


const form= document.querySelector('form')
const search= document.querySelector('input')

const messageOne= document.querySelector('#para1')
const messageTwo= document.querySelector('#para2')


form.addEventListener('submit',(e)=>{
     e.preventDefault()
     messageOne.textContent="loading..."
     messageTwo.textContent=""
     const location=search.value

     console.log(location)

     fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            messageOne.textContent=""
            if(data.error){
                messageOne.textContent=data.error
            }else{
                messageTwo.textContent=data.forcast
            }
            
        })
    })
})
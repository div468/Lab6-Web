const getMessages = async () => {
    const response = await fetch("/api/messages")
    const messages = await response.json()
    const ul = document.getElementById("messages")
    ul.innerHTML = ""

    for (let i = 0; i < messages.length; i++){
        const message = messages[i]
        const li = document.createElement("li")
        li.innerHTML = `<strong>${message.user}:</strong> ${message.text}`
        ul.append(li)
    }
}

const postMessage = async (message) => {
    await fetch("/api/messages", {
        method:"POST",
         body:JSON.stringify(message) 
        })

    getMessages()
}

setInterval(() =>{
    getMessages()
}, 1000)

document.getElementById("send").addEventListener("click", ()=>{
    const textArea = document.getElementById("message")
    const message = textArea.value
    postMessage(
        {
            user:"Julián",
            text:message,
        }
    )
})
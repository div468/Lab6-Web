let renderedMessages = 0
let message_sent = false

const getMessages = async () => {
    const ul = document.getElementById("messages")

    const nearBottom = ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 10

    const response = await fetch("/api/messages")
    const messages = await response.json()

    if (messages.length > renderedMessages) {

        for (let i = renderedMessages; i < messages.length; i++) {
            const message = messages[i]

            const li = document.createElement("li")
            li.innerHTML = `<strong>${message.user}:</strong> ${message.text}`

            ul.append(li)
        }

        if (nearBottom || message_sent) {
            ul.scrollTop = ul.scrollHeight
        }

        renderedMessages = messages.length
        message_sent = false
    }
}

const postMessage = async (message) => {
    message_sent = true

    await fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })

    getMessages()
}

setInterval(() => {
    getMessages()
}, 1000)

document.getElementById("send").addEventListener("click", () => {
    const textArea = document.getElementById("message")

    postMessage({
        user: "Julián",
        text: textArea.value
    })

    textArea.value = ""
})
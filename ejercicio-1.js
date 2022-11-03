const http = require('http')

const server = http.createServer(( request, response ) => {
    const message = getMensajeSegunHora()
    response.end(message)
})

function getMensajeSegunHora() {
    const hora = new Date().getHours()

    if (hora >= 6 && hora <= 12) {
        return 'Good morning!'
    }

    if (hora >= 13 && hora <= 19) {
        return 'Good evening!'
    }

    return 'Good night!'
}

const connectedServer = server.listen(8080, () => {
    console.log('Servidor escuchando en el 8080')
})
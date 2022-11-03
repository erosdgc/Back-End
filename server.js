const http = require('http')

const server = http.createServer((message, response) => {
    response.end('Hola Eros')
})

const connection = server.listen(8080, () => {
    console.log('Servidor escuchando en el 8080')
})
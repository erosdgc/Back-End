const operacion = (num1, num2, operac) => {
    return operac(num1, num2)
}

const suma = (num1, num2) => {
    return num1 + num2
}

const resta = (num1, num2) => {
    return num1 - num2
}

function dividir(num1, num2) {
    return new Promise((resolve, reject) => {
        if (num1 == 0) {
            reject("No se puede dividir por 0")
        }
        else {
            resolve(num1 / num2)
        }
    })
}

// console.log(operacion(2, 3, suma))
// console.log(operacion(2, 3, resta))

dividir(4, 2)
    .then(result => {
        console.log(result)
    })
    .then((result2 => {
        console.log(result2 * 2)
    }))
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        console.log("fin")
    })
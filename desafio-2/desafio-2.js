class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = Math.random().toString(36).substr(2, 9); // Generar ID único
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Verificar si el código ya existe en otro producto
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            throw new Error('El código de producto ya está en uso.');
        }

        const product = new Product(title, description, price, thumbnail, code, stock);
        this.products.push(product);
        return product;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        return product;
    }
}

// Crear una instancia de la clase ProductManager
const productManager = new ProductManager();

// Llamar a "getProducts" en la instancia creada, debe devolver un arreglo vacío []
const products = productManager.getProducts();
console.log("Productos: ", products); // []

// Llamar al método "addProduct" con los campos especificados
const newProduct = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
};
const addedProduct = productManager.addProduct(newProduct);
console.log("Producto agregado: ", addedProduct); // Producto agregado: { id: 1, ... }

// Verificar que el producto se haya agregado satisfactoriamente con un id generado automáticamente
console.log("Productos después de agregar: ", productManager.getProducts()); // [ { id: 1, ... } ]

//Llamar a "getProductById" con el id del producto recién agregado
const productById = productManager.getProductById(1);
console.log("Producto por id: ", productById); // Producto por id: { id: 1, ... }

// Llamar al método "updateProduct" para cambiar un campo del producto
const updatedProduct = {
    id: 1, // Es importante incluir el id del producto que se quiere actualizar
    title: "producto actualizado",
    description: "Este es un producto actualizado",
    price: 250,
    thumbnail: "Nuevo thumbnail",
    code: "abc123",
    stock: 30
};
const result = productManager.updateProduct(updatedProduct);
console.log("Resultado de la actualización: ", result); // Resultado de la actualización: true

// Verificar que el producto se haya actualizado correctamente
console.log("Producto actualizado: ", productManager.getProductById(1)); // Producto actualizado: { id: 1, ... }

// Llamar al método "deleteProduct" para eliminar un producto
const productIdToDelete = 1; // Es importante incluir el id del producto que se quiere eliminar
const deleteResult = productManager.deleteProduct(productIdToDelete);
console.log("Resultado de la eliminación: ", deleteResult); // Resultado de la eliminación: true

// Verificar que el producto se haya eliminado correctamente
console.log("Productos después de eliminar: ", productManager.getProducts()); // []

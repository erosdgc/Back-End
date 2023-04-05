class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = Math.random().toString(36).substr(2, 9); // Generar un ID único
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

// Llamar al método getProducts en la instancia creada, y devolver un arreglo vacío []
const products = productManager.getProducts();
console.log(products); // Output: []

// Agregar un nuevo producto
const newProduct = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
console.log(newProduct); // Output: Producto agregado con éxito

// Llamar al método getProducts nuevamente, mostrando el producto recién agregado
const updatedProducts = productManager.getProducts();
console.log(updatedProducts); // Output: [Product]

// Intentar agregar un producto con el mismo código, debe arrojar un error
try {
    const duplicateProduct = productManager.addProduct("producto duplicado", "Este es un producto duplicado", 300, "sin imagen", "abc123", 10);
} catch (error) {
    console.log(error.message); // Output: El código de producto ya está en uso.
}

// Obtener un producto por ID
const getProduct = productManager.getProductById(newProduct.id);
console.log(getProduct); // Output: Product

// Intentar obtener un producto con un ID inválido, debe arrojar un error
try {
    const invalidProductId = productManager.getProductById("invalid-id");
} catch (error) {
    console.log(error.message); // Output: Producto no encontrado.
}

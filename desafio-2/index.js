import ProductManager from "./managers/productsManager.js";

const manager = new ProductManager();

const env = async () => {
    const products = await manager.getProducts();
    console.log(products);

    const product = {
        id: Math.random().toString(36).substr(2, 9),
        title: "producto prueba",
        description: "este es un producto prueba",
        price: 200,
        thumbnail: "sin imagen",
        code: "abc123",
        stock: 25,
    }

    await manager.createProduct(product);

    const productsResult = await manager.getProducts();
    console.log(productsResult)
}

env();

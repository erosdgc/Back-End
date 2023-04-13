import fs from 'fs';

const path = './files/Products.json'

export default class ProductManager {

    getProducts = async () => {
        try {
            if (fs.existsSync()) {
                const data = await fs.promises.readFile(path, 'utf-8');
                console.log(data);
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    createProduct = async (product) => {
        try {
            const products = await this.getProducts();

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[products.length - 1].id + 1;
            }

            products.push(product);

            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log(error);
        }
    }

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
import express from "express";
// const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// ----------------------------- PRODUCTOS ------------------------------ //

// Products Express Routes
const productsRouter = express.Router();

// Leer archivo de products
const readProducts = () => {
    const products = fs.readFileSync('files/productos.json', 'utf-8');
    return JSON.parse(products);
}

// Escribir archivo de products
const writeProducts = (products) => {
    fs.writeFileSync('files/productos.json', JSON.stringify(products));
};

// Rutas para manejar products
productsRouter.get('/', (req, res) => {
    const products = readProducts();
    res.json(products);
});

// Buscar productos
productsRouter.get('/:pid', (req, res) => {
    const products = readProducts();
    const producto = products.find((p) => p.id === req.params.pid);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Estructura del producto (en body)
productsRouter.post('/', (req, res) => {
    const products = readProducts();
    const producto = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status || true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || [],
    };
    products.push(producto);
    writeProducts();
    res.status(201).json(producto);
});


// Productos del index
productsRouter.put('/:pid', (req, res) => {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === req.params.pid);
    if (index !== -1) {
        products[index].title = req.body.title || products[index].title;
        products[index].description = req.body.description || products[index].description;
        products[index].code = req.body.code || products[index].code;
        products[index].price = req.body.price || products[index].price;
        products[index].status = req.body.status || products[index].status;
        products[index].stock = req.body.stock || products[index].stock;
        products[index].category = req.body.category || products[index].category;
        products[index].thumbnails = req.body.thumbnails || products[index].thumbnails;
        writeProducts();
        res.json(products[index]);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Borrar producto
productsRouter.delete('/:pid', (req, res) => {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === req.params.pid);
    if (index !== -1) {
        const productoEliminado = products.splice(index, 1)[0];
        writeProducts(); // duda si debo agregar JSON.stringify(products, null, 2)
        res.status(200).json(productoEliminado);
        res.json({ message: 'Producto eliminado exitosamente' });
    } else {
        res.status(404).send('Producto no encontrado');
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// --------------------------- FIN PRODUCTOS ---------------------------- //

// ------------------------------ CARRITO ------------------------------- //

// Carts Express Router
const cartsRouter = express.Router();

// Leer archivo de carritos
const readCarts = () => {
    const carts = fs.readFileSync('files/carrito.json', 'utf-8');
    return JSON.parse(carts);
}

// Escribir archivo de carritos
const writeCarts = (carts) => {
    fs.writeFileSync('files/carrito.json', JSON.stringify(carts));
}

// Ruta para el carrito
cartsRouter.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: uuidv4(),
        products: []
    };
    carts.push(newCart);
    writeCarts();
    res.status(201).json(newCart);
});

// Ver carrito
cartsRouter.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find((c) => c.id === req.params.cid);
    if (cart) {
        res.status(200).json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

// Buscar producto en el carrito
cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const cartIndex = carts.findIndex((c) => c.id === req.params.cid);
    if (cartIndex !== -1) {
        const products = readProducts();
        const productIndex = products.findIndex((p) => p.id === req.params.pid);
        if (productIndex !== -1) {
            const product = products[productIndex];
            const cart = carts[cartIndex];
            const cartProductIndex = cart.products.findIndex((p) => p.product === product.id);
            if (cartProductIndex !== -1) {
                cart.products[cartProductIndex].quantity++;
            } else {
                cart.products.push({ product: product.id, quantity: 1 });
            }
            writeCarts();
            res.status(201).json(cart);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

// Vaciar carrito
cartsRouter.delete('/:cid', (req, res) => {
    const carts = readCarts();
    const index = carts.findIndex((p) => p.id === req.params.pid);
    if (index !== -1) {
        const carritoEliminado = carts.splice(index, 1)[0];
        writeCarts();
        res.status(200).json(carritoEliminado);
        res.json({ message: 'Carrito eliminado exitosamente' });
    } else {
        res.status(404).send('Carrito inexistente');
        res.status(404).json({ message: 'Carrito inexistente' });
    }
});

// ---------------------------- FIN CARRITO ----------------------------- //

// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);

app.use('/routes/productos.js', productsRouter);
app.use('/routes/carrito.js', cartsRouter);

module.exports = router;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
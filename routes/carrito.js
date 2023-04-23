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
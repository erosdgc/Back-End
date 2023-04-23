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
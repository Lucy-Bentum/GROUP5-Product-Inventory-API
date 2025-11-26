let products = require("../data/products");

// CREATE a product
exports.createProduct = (req, res) => {
    const { name, quantity, price } = req.body;

    if (!name || !quantity || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        quantity,
        price
    };

    products.push(newProduct);
    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
};

// GET all products
exports.getProducts = (req, res) => {
    res.json(products);
};

// GET product by ID
exports.getProductById = (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
};

// UPDATE product
exports.updateProduct = (req, res) => {
    const product = products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const { name, quantity, price } = req.body;

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    res.json({
        message: "Product updated successfully",
        product
    });
};

// DELETE product
exports.deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(index, 1);

    res.json({ message: "Product deleted successfully" });
};

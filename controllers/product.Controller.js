import Product from '../models/product.model.js';

// Get all products
export const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Get single product
export const getProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Create product
export const createProduct = async (req, res, next) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Update product
export const updateProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);

		if (!product) {
			return res.status(404).json({ msg: 'Product not found.' });
		}

		const updatedProduct = await Product.findById(id);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Delete product
export const deleteProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ msg: 'Product not found.' });
		}

		if (!(await Product.findById(id))) {
			res.status(200).json('Product deleted.');
		} else {
			res
				.status(400)
				.json('Something went wrong. Product found but not deleted.');
		}
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

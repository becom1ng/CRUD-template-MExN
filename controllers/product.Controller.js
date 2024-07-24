import Product from '../models/product.model.js';

// Get all products
export const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		error.status = 404;
		return next(error);
	}
};

// Get single product
export const getProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		res.status(200).json(product);
	} catch (error) {
		return next(error);
	}
};

// Create product
export const createProduct = async (req, res, next) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		return next(error);
	}
};

// Update product
export const updateProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);

		if (!product) {
			const error = new Error('Product not found.');
			error.status = 404;
			return next(error);
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
			const error = new Error('Product not found.');
			error.status = 404;
			return next(error);
		}

		if (!(await Product.findById(id))) {
			res.status(200).json('Product deleted.');
		} else {
			const error = new Error(
				'Something went wrong. Product found but not deleted.',
			);
			error.status = 400;
			return next(error);
		}
	} catch (error) {
		return next(error);
	}
};

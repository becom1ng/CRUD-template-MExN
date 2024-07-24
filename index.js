import express from 'express';
import mongoose from 'mongoose';
import Product from './models/product.model.js';
const port = process.env.PORT || 3000;

const app = express();

//  Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Establish DB connection and start server
await mongoose
	// .connect('mongodb://localhost:27017/CRUD-template', { autoIndex: false }) // disable auto indexing for prod
	.connect('mongodb://localhost:27017/CRUD-template')
	.then(() => {
		console.log('Connected to MongoDB!');
		app.listen(port, () => {
			console.log(`Server is running on port ${port}.`);
		});
	})
	.catch((err) => console.log('Error connecting to MongoDB.'));

// Basic response to verify server is working
app.get('/', (req, res) => {
	res.send('Hello from Node API');
});

// * Basic API testing
// Get all products
app.get('/api/products', async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

// Create product
app.post('/api/products', async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

// Update product
app.put('/api/products/:id', async (req, res) => {
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
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
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
});

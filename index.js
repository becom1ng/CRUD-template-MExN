import express from 'express';
import mongoose from 'mongoose';
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';
import products from './routes/products.route.js';
const port = process.env.PORT || 3000;

const app = express();

//  Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Basic response to verify server is working
app.get('/', (req, res) => {
	res.send('Hello from Node API');
});

// Routes
app.use('/api/products', products);

// Error handler
app.use(notFound);
app.use(errorHandler);

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
	.catch((_err) => console.log('Error connecting to MongoDB.'));

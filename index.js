import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

await mongoose
	.connect('mongodb://localhost:27017/CRUD-template')
	.then(() => {
		console.log('Connected to MongoDB!');
		app.listen(port, () => {
			console.log(`Server is running on port ${port}.`);
		});
	})
	.catch((err) => console.log('Error connecting to MongoDB.'));

app.get('/', (req, res) => {
	res.send('Hello from Node API');
});

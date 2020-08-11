import express from 'express';
import routes from './routes';

const app = express();
export const port = 3333;

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server is running, port: ${port}`));
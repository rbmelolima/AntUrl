import express from 'express';
import UrlShortener from './controllers/UrlShortener';

const routes = express.Router();

const urlShortenerController = new UrlShortener();

routes.post('/ant', urlShortenerController.create);
routes.get('/:shortUrl', urlShortenerController.redirect);
routes.get('/', urlShortenerController.list);

export default routes;
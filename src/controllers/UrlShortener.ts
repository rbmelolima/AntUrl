import { Request, Response } from 'express';
import validURL from '../utils/validUrl';
import generateHash from '../utils/generateHash';
import database from '../database/connection';
import { port } from '../server';
import auth from '../auth';

export default class UrlShortener {
  async create(request: Request, response: Response) {
    try {
      const { long_url } = request.body;

      if(!long_url) {
        return response.status(400).json({
          error: "Missing long_url param"
        });
      }

      const isValidUrl = validURL(long_url);
      console.log("Verifica se a url é válida", isValidUrl);

      if(!isValidUrl) {
        return response.status(400).json({
          error: "It is not a valid url"
        });
      }

      const shortUrl = generateHash();

      await database('urls').insert({
        longUrl: long_url,
        shortUrl
      });

      return response.status(200).json({
        shortUrl: `http://localhost:${ port }/${ shortUrl }`
      });

    } catch(error) {
      return response.status(400).json({
        'message': 'Unexpected error',
        'error': error
      });
    }
  }

  async redirect(request: Request, response: Response) {
    try {
      const { shortUrl } = request.params;

      const url = await database('urls')
        .first()
        .column('longUrl')
        .where('shortUrl', '=', shortUrl);

      if(url === undefined) {
        return response.status(404).send();
      }

      const { longUrl } = url;

      return response.redirect(longUrl);
    }
    catch(error) {
      return response.status(400).json({
        'message': 'Unexpected error',
        'error': error
      });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const { admin, password } = request.headers;

      if(admin !== auth.admin || password !== auth.password) {
        return response.status(401).send();
      }

      const allUrls = await database
        .from('urls')
        .select('*');

      if(allUrls.length <= 0) {
        return response.status(204).json({
          'message': 'Empty'
        });
      }

      return response.json(allUrls);

    } catch(error) {
      return response.status(400).json({
        'message': 'Unexpected error',
        'error': error
      });
    }
  }
}
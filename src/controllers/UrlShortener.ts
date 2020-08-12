import { Request, Response } from 'express';
import validURL from '../utils/validUrl';
import generateHash from '../utils/generateHash';
import database from '../database/connection';
import { port } from '../server';
import auth from '../auth';
import ProblemRequest from '../helpers/ProblemRequest';

export default class UrlShortener {
  async create(request: Request, response: Response) {
    try {
      const { longUrl } = request.body;

      if(!longUrl) {
        ProblemRequest(400, 'Missing longUrl param', response);
      }

      const isValidUrl = validURL(longUrl);

      if(!isValidUrl) {
        ProblemRequest(400, 'It is not a valid url', response);
      }

      const verifyUrlExistsInDatabase = await database('urls')
        .first()
        .column('shortUrl')
        .where('longUrl', '=', longUrl);

      let shortUrl = generateHash();

      if(!verifyUrlExistsInDatabase) {
        const now = new Date();

        await database('urls').insert({
          longUrl,
          shortUrl,
          created_at: now.toLocaleDateString()
        });
      }

      else {
        shortUrl = verifyUrlExistsInDatabase.shortUrl;
      }

      return response.status(200).json({
        shortUrl: `http://localhost:${ port }/${ shortUrl }`
      });

    } catch(error) {
      ProblemRequest(400, 'Unexpected error', response);
    }
  }

  async redirect(request: Request, response: Response) {
    try {
      const { shortUrl } = request.params;

      const url = await database('urls')
        .first()
        .column('longUrl', 'cliked')
        .where('shortUrl', '=', shortUrl);

      const { longUrl, cliked } = url;

      if(url === undefined) {
        ProblemRequest(404, 'Not found', response);
      }

      await database('urls')
        .where('shortUrl', '=', shortUrl)
        .update({ cliked: cliked + 1 });

      return response.redirect(longUrl);
    }
    catch(error) {
      ProblemRequest(400, error, response);
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
        ProblemRequest(204, 'Empty', response);
      }

      return response.json(allUrls);

    } catch(error) {
      ProblemRequest(400, 'Unexpected error', response);
    }
  }

  async status(request: Request, response: Response) {
    try {
      const { shortUrl } = request.params;

      const status = await database('urls')
        .first()
        .column('cliked')
        .where('shortUrl', '=', shortUrl);

      if(status === undefined) {
        ProblemRequest(404, 'Not found', response);
      }

      const { cliked } = status;

      return response.status(200).json({
        shortUrl,
        cliked
      });

    } catch(error) {
      ProblemRequest(400, 'Unexpected error', response);
    }
  }

}


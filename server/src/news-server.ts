import { createServer, Server } from 'http';
import { Request, Response } from 'express';
import express from 'express';
import path from 'path';
import { environment } from './environment';

import { MongoClient, ObjectID } from 'mongodb';

export class NewsServer {
  public static readonly PORT:number = 3003;
  private app: express.Application;
  private server: Server;
  private port: string | number;
  private db: any;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.mongoConnect();
    this.static_content();
    this.routes();
    this.listen();
  }

  private mongoConnect(): void {
    console.log('Connected');
    MongoClient.connect(environment.mongourl, { useNewUrlParser: true }).then(
      connection => {
      this.db = connection.db('recettes');
      }
    );
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || NewsServer.PORT;
  }

  private static_content(): void {
    this.app.use(require('cors')());
    this.app.use(require('body-parser').json());
    this.app.use(express.static(path.join(__dirname, '/')));
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'));
    });
    this.app.get('/dashboard', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'));
    });
    this.app.get('/news', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'));
    });
  }


  private routes(): void {
    this.app.get('/api/categories', async (req: Request, res: Response) => {
      const docs = await this.db.collection('documents')
        .aggregate([{ '$match': { 'doctype': 'Recette'}},
          { '$group': {
            '_id': '$category',
            'distinctCount': { '$sum': 1 }
          }},
          { '$sort': {'distinctCount': -1}}
        ]).toArray();
      res.json({'data': docs});
    });

    this.app.get('/api/recettes/:page/:category', async (req: Request, res: Response) => {
      const start = (req.params.page * 12) + (0 * 1);
      if (req.params.category !== 'undefined') {
        const docs = await this.db.collection('documents')
          .find({'doctype': 'Recette', 'category': req.params.category}, {skip: start})
          .sort({})
          .limit(12)
          .toArray();
        res.json({'data': docs});
      } else {
        const docs = await this.db.collection('documents')
          .find({'doctype': 'Recette'}, {skip: start})
          .sort({})
          .limit(12)
          .toArray();
        res.json({'data': docs});
      }
    });

    this.app.get('/api/recette/:id', async (req: Request, res: Response) => {
      console.log(req.params.id);
      const docs = await this.db.collection('documents')
        .findOne({'_id': `aroma_Recette_${req.params.id}`});
      res.json({'data': docs});
    });

  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

  }

  public getApp(): express.Application {
    return this.app;
  }
}

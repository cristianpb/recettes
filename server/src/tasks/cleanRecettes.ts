import { MongoClient } from 'mongodb';
import { environment } from '../environment';

(async () => {
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });
  const db = connection.db('recettes');

  await db.dropCollection('documents');
  const collection_documents = await db.collection('documents');
  await collection_documents.createIndex({ 'doctype': 1});
  await collection_documents.createIndex( { name: 'text' } );
  console.log('Index Created');
})();

#!/usr/bin/env node

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost';
    const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017;
    const database = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : 'files_manager';
    const DBurl = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(DBurl, { useUnifiedTopology: true });
    this.isConnected = false;
    this.client.connect()
      .then(() => {
        this.isConnected = true;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    await this.client.connect();
    const users = await this.client.db(this.database).collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    await this.client.connect();
    const users = await this.client.db(this.database).collection('files').countDocuments();
    return users;
  }

  async usersCollection() {
    return this.client.db().collection('users');
  }
}

const dbClient = new DBClient();
module.exports = dbClient;

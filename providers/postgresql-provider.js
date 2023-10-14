const { Client } = require('pg');
require('dotenv').config();

class Provider {
  constructor() {
    if (Provider.instance) {
      return Provider.instance;
    }
    Provider.instance = this;

    this.provider = new Client({
      connectionString: process.env.DATABASE_CONNECTION_STRING,
    });
  }

  connect() {
    return provider.connect()
  }
}

module.exports = Provider;

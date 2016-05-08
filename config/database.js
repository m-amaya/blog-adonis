'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the settings to be used while setting up a database
  | it is a reference of defined connections below in this file.
  |
  */
  connection: Env.get('DB_CONNECTION', 'psql'),

  /*
  |--------------------------------------------------------------------------
  | Migrations Table
  |--------------------------------------------------------------------------
  |
  | By default adonis database migrations table is set to adonis_schema.
  | Here is your chance to override it.
  |
  */
   migrationsTable: 'adonis_schema',

  /*
  |--------------------------------------------------------------------------
  |   Sqlite Connection
  |--------------------------------------------------------------------------
  |
  |   Here we define sqlite connection to be used by your models or
  |   Database provider. It is good keep development database as
  |   sqlite , rest depends upon your application preferences.
  |
  |--------------------------------------------------------------------------
  |   npm install --save-dev sqlite3
  |--------------------------------------------------------------------------
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.storagePath('development.sqlite3')
    },
    debug: false
  },

  /*
  |--------------------------------------------------------------------------
  |   Mysql Connection
  |--------------------------------------------------------------------------
  |
  |   Below is configuration for mysql database, if your application is
  |   dependent upon mysql , define your credentials inside .env file,
  |   as it is a good practice to keep environment configuration
  |   isolated for each environment.
  |
  |--------------------------------------------------------------------------
  |   npm install --save mysql
  |--------------------------------------------------------------------------
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('MYSQL_HOST', 'localhost'),
      user: Env.get('MYSQL_USER', 'root'),
      password: Env.get('MYSQL_PASSWORD', ''),
      database: Env.get('MYSQL_DATABASE', 'adonis')
    }
  },

/*
|--------------------------------------------------------------------------
|   Feel Free
|--------------------------------------------------------------------------
|
|  Feel free to define as many connections you like to define.
|
*/
  psql: {
    client: 'pg',
    connection: {
      host: 'ec2-54-243-187-114.compute-1.amazonaws.com',
      user: 'rasjsfjpbleefo',
      password: '_YCisXmuU8lhUsKM7ZRPC1rG2t',
      database: 'dfjfdpmp603pbg',
      ssl: true
    }
  }
}

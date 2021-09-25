export class Configuration {
  public type;
  public host;
  public port;
  public username;
  public password;
  public database;
  public connectionName;
  
  constructor(){
    this.type = process.env.type || 'postgres';
    this.host = process.env.host || 'localhost';
    this.port = process.env.port || 5432;
    this.username = process.env.username || 'postventa';
    this.password = process.env.password || 'postventa';
    this.database = process.env.database || 'postventa';
    this.connectionName = process.env.connectionName || 'postventa';

    console.log('this.type:', this.type);
    console.log('this.host:', this.host);
    console.log('this.port:', this.port);
    console.log('this.username:', this.username);
    console.log('this.password:', this.password);
    console.log('this.database:', this.database);
    
  }

  /**
   * Return data base configuration to connection
   */
  public databaseConfiguration(){
    return {
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: ["build/database/entities/**/*.js"],
      synchronize: true,
      name: this.connectionName
    }
  }
}
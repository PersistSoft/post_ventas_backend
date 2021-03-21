export class Configuration {
  public type;
  public host;
  public port;
  public username;
  public password;
  public database;
  public connectionName;

  constructor(){
    this.type = process.env.type;
    this.host = process.env.host;
    this.port = process.env.port;
    this.username = process.env.username;
    this.password = process.env.password;
    this.database = process.env.database;
    this.connectionName = process.env.connectionName;
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
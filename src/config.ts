export class Configuration {
  public type;
  public host;
  public port;
  public username;
  public password;
  public database;
  public connectionName;
  // SMTP
  public smtpHost;
  public smtpPort;
  public smtpSecure;
  public smtpRequireTLS;
  public smtpUser;
  public smtpPass;
  
  constructor(){
    this.type = process.env.type || 'postgres';
    this.host = process.env.host || 'localhost';
    this.port = process.env.port || 5432;
    this.username = process.env.username || 'postventa';
    this.password = process.env.password || 'postventa';
    this.database = process.env.database || 'postventa';
    this.connectionName = process.env.connectionName || 'postventa';

    this.smtpHost = process.env.smtpHost || 'smtp.gmail.com';
    this.smtpPort = process.env.smtpPort || 587;
    this.smtpSecure = process.env.smtpSecure || false;
    this.smtpRequireTLS = process.env.smtpRequireTLS || true;
    this.smtpUser = process.env.smtpUser || 'pacs.oviyam@gmail.com';
    this.smtpPass = process.env.smtpPass || 'wjqyyiemaqioedjn';

    console.log('this.smtpHost:', this.smtpHost);    

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

  public smtp(){
    return {
      host: this.smtpHost,
      port: this.smtpPort,
      secure: this.smtpSecure,
      requireTLS: this.smtpRequireTLS,
      auth: {
        user: this.smtpUser,
        pass: this.smtpPass
      }
    }
  }
}
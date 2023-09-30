import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    host: process.env.HOST,
    port: parseInt(process.env.MONGO_INITDB_PORT,27017),
    user:process.env.MONGO_INITDB_ROOT_USERNAME,
    pass:process.env.MONGO_INITDB_ROOT_PASSWORD,
    base:process.env.MONGO_INITDB_DATABASE,
    uri:`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}:${process.env.MONGO_INITDB_PORT}`,
    
  }));

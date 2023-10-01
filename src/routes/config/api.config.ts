import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  key: process.env.API_KEY_GOOGLE,

}));

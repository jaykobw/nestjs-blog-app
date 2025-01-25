import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: 'O6JcpDBxGEKHkzd9kQPNIo6QRHQdspG75sKjLrae8YU=',
    audience: 'localhost:3000',
    issuer: 'localhost:3000',
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400'),
  };
});

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '~/shared/domain/configs/database.interface';
import { RedisConfig } from '~/shared/domain/configs/redis.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, RedisConfig {
  constructor(private configService: ConfigService) {}

  public getDatabaseUrl(): string {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    if (!databaseUrl) throw new Error('DATABASE_URL is not defined');

    return databaseUrl;
  }

  public getRedisHost(): string {
    const redisHost = this.configService.get<string>('REDIS_HOST');
    if (!redisHost) throw new Error('REDIS_HOST is not defined');

    return redisHost;
  }

  public getRedisPort(): number {
    const redisPort = this.configService.get<number>('REDIS_PORT');
    if (!redisPort) throw new Error('REDIS_PORT is not defined');

    return redisPort;
  }

  public getRedisUrl(): string {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    if (!redisUrl) throw new Error('REDIS_URL is not defined');

    return redisUrl;
  }
}

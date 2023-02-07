import { Module } from '@nestjs/common';
import { Db } from './db.service';

@Module({
  providers: [Db],
  exports: [Db],
})
export class DbModule {}

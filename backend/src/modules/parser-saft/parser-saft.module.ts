import { Module } from '@nestjs/common';
import { ParserSaftService } from './parser-saft.service';
import { ParserSaftController } from './parser-saft.controller';

@Module({
  controllers: [ParserSaftController],
  providers: [ParserSaftService],
})
export class ParserSaftModule {}

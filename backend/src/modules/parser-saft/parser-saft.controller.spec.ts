import { Test, TestingModule } from '@nestjs/testing';
import { ParserSaftController } from './parser-saft.controller';
import { ParserSaftService } from './parser-saft.service';

describe('ParserSaftController', () => {
  let controller: ParserSaftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParserSaftController],
      providers: [ParserSaftService],
    }).compile();

    controller = module.get<ParserSaftController>(ParserSaftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

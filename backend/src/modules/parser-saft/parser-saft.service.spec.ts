import { Test, TestingModule } from '@nestjs/testing';
import { ParserSaftService } from './parser-saft.service';

describe('ParserSaftService', () => {
  let service: ParserSaftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParserSaftService],
    }).compile();

    service = module.get<ParserSaftService>(ParserSaftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

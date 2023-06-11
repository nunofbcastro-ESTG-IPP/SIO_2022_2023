import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from '@/common/dto/file-upload.dto';
import { ParserSaftService } from './parser-saft.service';

@Controller('parser-saft')
export class ParserSaftController {
  constructor(private readonly parserSaftService: ParserSaftService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Saft file',
    type: FileUploadDto,
  })
  @Post()
  parse(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'xml',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const xmlFileContent = file.buffer.toString();

    return this.parserSaftService.parseSaftFile(xmlFileContent);
  }
}

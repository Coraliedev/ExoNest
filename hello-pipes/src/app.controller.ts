import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseIntPipe } from './parse-int/parse-int.pipe';
import { SlugPipe } from './slug/slug.pipe';
import { UpperPipe } from './upper/upper.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  @UsePipes(UpperPipe)
  getHello(@Param('name') name:string): string {
    return this.appService.getHello(name);
  }

  @Get('articles/:id')
  @UsePipes(ParseIntPipe)
  getArticleById(@Param('id') id){
    const idType = typeof id;
    const res = {id, idType};
    return res;
  }

  @Post('articles')
  @UsePipes(SlugPipe)
  createArticle(@Body('title') title, @Body() allBody){
    allBody.slug = title;
    return allBody;
  }


  @Post()
  @UsePipes(UpperPipe)
  createMessage(@Body() message){
    console.log(message);
    return message;
  }
}

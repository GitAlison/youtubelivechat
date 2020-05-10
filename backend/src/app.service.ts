import { Injectable, HttpService } from '@nestjs/common';
const cheerio = require('cheerio');
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getWebHTMl(url) {

    return this.http
      .get(url)
      .pipe(map(response => response.data))
      .toPromise();
  }

  async getWeb(url) {
    let html = await this.getWebHTMl(url);

    let $ = cheerio.load(html);
    // let body = cheerio($('div.yt-lockup-content'));
    let body = cheerio($('div.yt-lockup-dismissable'));

    let dados:any[]=[];
    let index= 0;
    body.each(function() {

      const duracao =  $(this).find('.video-time').text()
      const image =  $(this).find('div > div > a > div > span').children('img').eq(0).attr('src')
      const imageSecond =  $(this).find('.yt-thumb-simple').children('img').eq(0).attr('data-thumb')
      const title =  $(this).find('div > div > h3 > a').text()
      const videoId = $(this).find('div > div > a').attr('href').split('/watch?v=')[1]
      console.log(videoId)

      index++


      if(imageSecond == undefined){
        dados.push({
          id:index,
          title:title,
          duration:duracao,
          image:image,
          video:videoId
        })

      }else{
        dados.push({
          id:index,
          title:title,
          duration:duracao,
          image:imageSecond,
          video:videoId
        })
      }
    });


    return dados;
  }
}

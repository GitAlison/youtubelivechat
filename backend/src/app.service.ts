import { Injectable, HttpService } from '@nestjs/common';
const cheerio = require('cheerio');
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getWebHTMl() {
    return this.http
      .get('https://www.youtube.com/feed/trending')
      .pipe(map(response => response.data))
      .toPromise();
  }

  async getWeb() {
    let html = await this.getWebHTMl();

    let $ = cheerio.load(html);
    // let body = cheerio($('div.yt-lockup-content'));
    let body = cheerio($('div.yt-lockup-dismissable'));

    let dados:any[]=[]

    body.each(function() {

     
      // const url =  $(this).find('div > div > a').attr('href')
      // console.log(url)

      // const duracao =  $(this).find('.video-time').text()



      const duracao =  $(this).find('.video-time').text()
      const image =  $(this).find('div > div > a > div > span').children('img').eq(0).attr('src')
      const imageSecond =  $(this).find('.yt-thumb-simple').children('img').eq(0).attr('data-thumb')
      const title =  $(this).find('div > div > h3 > a').text()


      if(imageSecond == undefined){
        dados.push({
          title:title,
          duration:duracao,
          image:image
        })
        // console.log(duracao , image)

      }else{
        dados.push({
          title:title,
          duration:duracao,
          image:imageSecond
        })
        // console.log(duracao , imageSecond)
      }

      // console.log(duracao , image)




      console.log('----');
      
    });

    console.log('fim');
    return dados;
  }
}

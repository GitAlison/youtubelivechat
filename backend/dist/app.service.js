"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cheerio = require('cheerio');
const operators_1 = require("rxjs/operators");
let AppService = class AppService {
    constructor(http) {
        this.http = http;
    }
    getHello() {
        return 'Hello World!';
    }
    async getWebHTMl(url) {
        return this.http
            .get(url)
            .pipe(operators_1.map(response => response.data))
            .toPromise();
    }
    async getWeb(url) {
        let html = await this.getWebHTMl(url);
        let $ = cheerio.load(html);
        let body = cheerio($('div.yt-lockup-dismissable'));
        let dados = [];
        let index = 0;
        body.each(function () {
            const duracao = $(this).find('.video-time').text();
            const image = $(this).find('div > div > a > div > span').children('img').eq(0).attr('src');
            const imageSecond = $(this).find('.yt-thumb-simple').children('img').eq(0).attr('data-thumb');
            const title = $(this).find('div > div > h3 > a').text();
            const videoId = $(this).find('div > div > a').attr('href').split('/watch?v=')[1];
            const views = $(this).find('.yt-lockup-meta-info').children('li').eq(0).text();
            const data = $(this).find('.yt-lockup-meta-info').children('li').eq(1).text();
            console.log(views, data);
            index++;
            if (imageSecond == undefined) {
                dados.push({
                    id: index,
                    title: title,
                    duration: duracao,
                    image: image,
                    video: videoId,
                    views: views,
                    data: data
                });
            }
            else {
                dados.push({
                    id: index,
                    title: title,
                    duration: duracao,
                    image: imageSecond,
                    video: videoId,
                    views: views,
                    data: data
                });
            }
        });
        return dados;
    }
    async getSugestionsVideo(video) {
        let html = await this.getWebHTMl(`https://www.youtube.com/embed/${video}`);
        console.log(html);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Video } from '../store/models/video.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseApi = environment.base_api;
  constructor(private http: HttpClient) {}

  getVideosHome() {
    return this.http.get<Video[]>(`${this.baseApi}index`);
  }

  searchVideo(query: string) {
    return this.http.get<Video[]>(`${this.baseApi}search/${query}`);
  }

  getTrending() {
    return this.http.get<Video[]>(`${this.baseApi}trending`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicModel } from '../models/music-model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }



  getMusicById(musicId: string): Observable<MusicModel> {
    return this.http.get<MusicModel>(`http://localhost:8082/music/${musicId}`);
  }

  updateMusicById(body:any,musicId: string): Observable<MusicModel>{
    return this.http.put<MusicModel>(`http://localhost:8082/music/${musicId}`, body);
  }

  deleteMusicById(musicId:string){
    return this.http.delete(`http://localhost:8082/music/${musicId}`);
  }

  newMusic(body:any){
    return this.http.post(`http://localhost:8082/music/new`, body)
  }
}

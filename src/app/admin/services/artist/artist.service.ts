import { Injectable } from '@angular/core';
import { ArtistModel } from '../../models/artist-model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MusicModel } from '../../models/music-model';
@Injectable({
  providedIn: 'root'
})
export class ArtistService {

 
 
  constructor(private http: HttpClient) { }

  getAll(page:number, pageSize:number, sortBy:string, sortOrder:string): Observable<ArtistModel[]> {
    return this.http.get<ArtistModel[]>('http://localhost:8082/artist',{ params: {
      page: page,
      pageSize: pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder,
      
    }});
  }
  
  getAllByName(name:string): Observable<ArtistModel[]>{
    return this.http.get<ArtistModel[]>(`http://localhost:8082/artist/name?word=${name}`);
  
  }
  getById(artistId:string){
    return this.http.get<ArtistModel>(`http://localhost:8082/artist/${artistId}`);
  }
  deleteById(artistId:string): Observable<any>{
    return this.http.delete(`http://localhost:8082/artist/${artistId}`)
  }
  getAllMusicsByArtistId(artistId: string): Observable<MusicModel[]>{
    return this.http.get<MusicModel[]>(`http://localhost:8082/music/artist/${artistId}`);
  }

  updateArtistById(artistId:string, body:any): Observable<ArtistModel>{
    return this.http.put<ArtistModel>(`http://localhost:8082/artist/${artistId}`, body);
  }

  newArtist(body:any): Observable<ArtistModel>{
    return this.http.post<ArtistModel>(`http://localhost:8082/artist/`, body)
  }


}

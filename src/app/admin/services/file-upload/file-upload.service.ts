import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  
    api_key = '899457154235112'
    cloud_name ='book-images'
    upload_preset = 'qv8y6uiu'

  

   url = `https://api.cloudinary.com/v1_1/${this.cloud_name}/image/upload`

  
  constructor(private http: HttpClient) { }

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("api_key",this.api_key);
    formData.append("upload_preset", this.upload_preset);

   

    return this.http.post(this.url, formData);
  }

}

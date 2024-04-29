import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ArtistModel } from '../../models/artist-model';
import { Router } from '@angular/router';
import { ArtistService } from '../../services/artist/artist.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newForm: FormGroup;
  subbmited: boolean = false;

  success:boolean = false;
  successMessage: string = 'Sucesso!';

  error:boolean = false;
  errorMessage: string = 'Ocorreu um erro!'

  artistId: string;
  artist: ArtistModel;

  uploaded = false;

  imageUrl: string = 'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg';
  status: "initial" | "uploading" | "sucess" |  "fail" = "initial";
  file: File | null = null;


  

  formatError: boolean = false;
  formatErrorMessage: string = 'Formato não permitido!'

  constructor( private formBuilder: FormBuilder, private fileUploadService: FileUploadService, private router: Router, private artistService: ArtistService) {
    this.newForm = formBuilder.group({
      name: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }





  onChange(event:any){
    const file: File = event.target.files[0];

    if(!(file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png')){
      this.error = true;
      this.errorMessage = 'Formato do arquivo não permitido, somente png, jpeg ou jpg!'

      setTimeout(() => {
        this.error = false;
      }, 4000)
      

     

    }else{
      this.status = "initial";
      this.file = file;
      this.fileUploadService.upload(this.file).subscribe(response => {
        this.imageUrl = response.url;
        this.uploaded = true;
       
      },(error) => {
        this.error = true;
        this.errorMessage = 'Occorreu um erro ao fazer upload da sua imagem!'
      })
    }
   

    
  }

  onSubmit(){
    this.subbmited = true;

    if( this.newForm.invalid){
      
      return;
    }
    const body = {
      name: this.newForm.get('name').value,
      image_url: this.imageUrl
    }
   
    if(this.uploaded){
       body.image_url = this.imageUrl;
    }

    this.artistService.newArtist(body).subscribe(response => {
     
      this.artist = response;
      this.success = true;
      this.successMessage = 'Novo artista salvo com sucesso!';
     

      setTimeout(() => {
        this.success = false;
        this.router.navigate(['admin/artists']);
      }, 3000)
    }, (error) => {
      if(error.status === 403){
        this.error = true;
        this.errorMessage = 'Não autorizado, redirecionando para login!';
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        },3000)
        
      }else{
        this.error = true;
        this.errorMessage = 'Erro ao salvar o novo artista!!'

        setTimeout(() => {
            this.error = false;
        },3000)
      }
        
    })

    
    
  }


}

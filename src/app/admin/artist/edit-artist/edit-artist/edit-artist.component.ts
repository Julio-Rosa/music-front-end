import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistModel } from 'src/app/admin/models/artist-model';
import { ArtistService } from 'src/app/admin/services/artist/artist.service';
import { FileUploadService } from 'src/app/admin/services/file-upload/file-upload.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

  success:boolean = false;
  successMessage: string = 'Sucesso!';

  error:boolean = false;
  errorMessage: string = 'Ocorreu um erro!'

  artistId: string;
  artist: ArtistModel;

  uploaded = false;

  editForm: FormGroup;
  subbmited: boolean = false;

  formatError: boolean = false;
  formatErrorMessage: string = 'Formato não permitido!'


  imageUrl: string;
  status: "initial" | "uploading" | "sucess" |  "fail" = "initial";
  file: File | null = null;

  constructor(private router: Router, private artistService: ArtistService, private activatedRoute: ActivatedRoute, private fileUploadService: FileUploadService, private formBuilder: FormBuilder) { 


    this.editForm = formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getArtistById();
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

    if( this.editForm.invalid){
      
      return;
    }
    const body = {
      name: this.editForm.get('name').value,
      image_url: this.artist.image_url
    }
    if(this.uploaded){
       body.image_url = this.imageUrl;
    }

    this.artistService.updateArtistById(this.artistId, body).subscribe(response => {
      this.artist = response;
      this.success = true;
      this.successMessage = 'Dados atualizados com sucesso!';

      setTimeout(() => {
        this.success = false;
        this.router.navigate(['admin/artist/', this.artistId]);
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
        this.errorMessage = 'Error ao atualizar os dados!'

        setTimeout(() => {
            this.error = false;
        },3000)
      }
        
    })

    
    
  }



  

  getArtistById(){
    this.activatedRoute.params.subscribe(params => {
      this.artistId = params['id'];
      this.artistService.getById(this.artistId).subscribe(response => {
          this.artist = response;
          this.imageUrl = response.image_url;
      })
    }, (error) => {
      this.error = true;
      
      setTimeout(() => {
        this.error = false;
      },3000)
    })
  }

  

}

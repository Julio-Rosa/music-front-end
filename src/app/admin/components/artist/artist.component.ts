import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../models/artist-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist/artist.service';
import { MusicModel } from '../../models/music-model';
import { MusicService } from '../../services/music.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  error:boolean = false;
  errorMessage: string;

  success:boolean = false;
  successMessage:string;

  artistId: string;
  musicId: string;
  artist: ArtistModel;
  musics: MusicModel[] = [];

  noMusics:boolean = false;
  isModalOpen: boolean = false;
  message:string = '';

  musicForm: FormGroup;
  subbmited: boolean = false;

  
  
  constructor(private fileUploadService: FileUploadService,private activatedRoute: ActivatedRoute, private route: Router, private artistService: ArtistService, private musicService: MusicService, private formBuilder: FormBuilder) { 
    this.musicForm = formBuilder.group({
      name: ['', Validators.required],
      releaseDate: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    
    this.getMusicsByArtist();
   

  }

  showDeleteModal(musicId: string){
    this.message = 'Tem certeza que você quer deletar esse item?'
    this.isModalOpen = true;
    this.musicId = musicId;

    console.log(this.isModalOpen);
  };
  getMusicsByArtist(){
    this.activatedRoute.params.subscribe(params => {
      this.artistId = params['id'];
      this.artistService.getById(this.artistId).subscribe(result => {
       this.artist = result;
      });
      this.artistService.getAllMusicsByArtistId(this.artistId).subscribe(result => {
        this.musics = result;
      },(error) => {
        if(error.status === 404){
          this.noMusics = true;
        }
      });
     
    });
  };

  deleteMusicById(musicId:string){
    this.musicService.deleteMusicById(musicId).subscribe(response => {
  
      
      this.success = true;
      this.successMessage = 'Musica deletada com sucesso!'
      this.isModalOpen = false;

      setTimeout(() => {
       
        
          this.success = false;
          window.location.reload();
       
          

      }, 3000)
    }, (error) => {
        this.error = true;
        this.isModalOpen = false;
        this.successMessage = 'Ocorreu um erro ao deletar!'
        
    })
  };
  cancelDelete(){
   
    this.isModalOpen = false;
  };
  confirmDelete(){
    this.deleteMusicById(this.musicId);
  };
  editMusic(musicId: string){
    this.route.navigate(['admin/music/edit', musicId])
  };
  newMusic(body:any){
    this.musicService.newMusic(body).subscribe(response => {
    
      this.success = true;
      this.successMessage = 'Nova musica salva com sucesso!';
      
      setTimeout(() => {
        this.success = false;
        window.location.reload();
      },2000);
    },(error) => {
      this.error = true;

      if(error.status === 403){

        setTimeout(() => {
          this.route.navigate(['auth/login']);
        },200)
        
      }
    })

  }

  

  editArtist(artistId:string){
    this.route.navigate(['/admin/artist/edit',artistId]);
  }



  onSubmit() {
    this.subbmited = true;
    if (this.musicForm.invalid) {
      
      return;
    } else {
      const body = { name: this.musicForm.get('name').value, release_date: this.musicForm.get('releaseDate').value, artist_id: this.artistId }

      this.newMusic(body);
    }
  }
}

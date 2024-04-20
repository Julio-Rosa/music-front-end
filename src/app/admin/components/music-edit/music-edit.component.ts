import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicModel } from '../../models/music-model';
import { MusicService } from '../../services/music.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtilService } from 'src/app/utils/date-util/date-util.service';


@Component({
  selector: 'app-music-edit',
  templateUrl: './music-edit.component.html',
  styleUrls: ['./music-edit.component.css']
})
export class MusicEditComponent implements OnInit {

  musicId: string;
  music: MusicModel;
  name: string;
  releaseDate: string;
  success: boolean = false;
  successMessage: string = "Sucesso!"
  error: boolean = false;
  errorMessage: string = 'Ocorreu um erro!';

  musicForm: FormGroup;
  subbmited: boolean = false;

  dateInput:string;




  constructor(private dateService: DateUtilService, private musicService: MusicService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.musicForm = formBuilder.group({
      name: ['', Validators.required],
      releaseDate: ['', [Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/), Validators.required]],
      musicUrl: ['',Validators.pattern(/^(http:\/\/|https:\/\/)/i)],

    });
  }

  ngOnInit(): void {
    
    this.getMusics();
    
   


  }


  getMusics() {
    this.activatedRoute.params.subscribe(params => {
      this.musicId = params['id'];
      this.musicService.getMusicById(this.musicId).subscribe(result => {
        this.music = result;
        this.name = this.music.name;
        this.dateInput = this.dateService.formatDateToGet(this.music.release_date);

       


      })
    });
  }
  updateMusic(body: any, musicId: string) {
    this.musicService.updateMusicById(body, musicId).subscribe(response => {
      this.success = true;
      this.successMessage = 'Mudanças salvas com sucesso!'
      setTimeout(() => {
       this.success = false;
      }, 5000)
    }, (error) => {
      this.error = true;
     
      if (error.status === 403) {
        this.errorMessage = error['error']['message'];
        setTimeout(() => {
         
          this.router.navigate(['auth/login'])
        }, 2000)
      }else{
        this.errorMessage = "Ocorreu um erro!"
        setTimeout(() => [
         
          this.error = false
        ],3000)
      }
    })
  }
  onSubmit() {
   
    this.subbmited = true;
    if (this.musicForm.invalid) {
     
      
      return;
    } else {

      const date = this.dateService.formatDateToSend(this.musicForm.get('releaseDate').value);
     
      const body = { name: this.musicForm.get('name').value, release_date: date, music_url: this.musicForm.get('musicUrl').value}

      this.updateMusic(body, this.musicId);
    }
  }
  onDateChange(event:any){
    const inputValue = event.target.value;

    if(inputValue.length === 2 && !inputValue.includes('/')){
      this.dateInput = inputValue + '/';
    }else if(inputValue.length === 5 && inputValue.charAt(2) === '/' && !inputValue.includes('/',3)){
      this.dateInput = inputValue.slice(0,5) + inputValue.charAt(5) + '/';
      
    }
  }

  




}

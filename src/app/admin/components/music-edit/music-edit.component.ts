import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicModel } from '../../models/music-model';
import { MusicService } from '../../services/music.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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




  constructor(private musicService: MusicService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.musicForm = formBuilder.group({
      name: ['', Validators.required],
      releaseDate: ['', Validators.required],

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
        this.releaseDate = this.music.release_date;

       


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
        }, 5000)
      }
    })
  }
  onSubmit() {
    this.subbmited = true;
    if (this.musicForm.invalid) {
      console.log(this.musicForm.errors)
      return;
    } else {
      const body = { name: this.musicForm.get('name').value, release_date: this.musicForm.get('releaseDate').value }

      this.updateMusic(body, this.musicId);
    }
  }



}

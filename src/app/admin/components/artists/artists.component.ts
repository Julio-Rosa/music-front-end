import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtistService } from '../../services/artist/artist.service';
import { ArtistModel } from '../../models/artist-model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  error: boolean = false;
  errorMessage: string = 'Ocorreu um erro!';

  success: boolean = false;
  successMessage: string;

  isModalOpen = false;
  message = 'Tem certeza que deseja deletar?????'

  artists: ArtistModel[] = [];
  noArtists: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  nameFilter: string = '';
  sortBy: string = 'createdAt';
  sortOrder: string = 'ASC';
  artistId: string = '';


  showConfirmationModal = false;

  @ViewChild('searchForm') searchForm!: NgForm;

  constructor(private artistService: ArtistService, private route: Router) { }

  ngOnInit(): void {
    this.getArtists();
  }

  reset() {
    this.noArtists = false;
    this.getArtists();
  };
  getByName() {
    this.noArtists = false;
    this.artists.splice(0, this.artists.length);
    this.artistService.getAllByName(this.nameFilter).subscribe(data => {

      this.artists = data;

    }, (error) => {
      if (error.status == 404) {
        this.noArtists = true;
      }
    });
    this.searchForm.resetForm();


  };
  getArtists() {
    this.artistService.getAll(this.page, this.pageSize, this.sortBy, this.sortOrder).subscribe(data => {
      this.artists = data;



    }, (error) => {
      if (error.status == 404) {
        this.noArtists = true;
      }else{
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000)
      }
     

    })

  };
  deleteById(id: string) {
    this.artistService.deleteById(id).subscribe(result => {
     
      this.reset();
      
      setTimeout(() => {

       
      }, 5000)
    }, (error) => {
      if (error.status === 403) {
        this.errorMessage = error['error']['message'];
        this.error = true;
        setTimeout(() => {
          this.route.navigate(['auth/login'])
        }, 5000)
      }
    })
  };
 
  showDeleteModal(artistId: string){
    this.isModalOpen = true;
  }
 
  edit(artistId: string) {
    this.route.navigate(['admin/artist/', artistId])
  }


  cancelDelete(){
    this.isModalOpen = false;
  }
  confirmDelete(){


    this.isModalOpen = false;

  }

  newArtistRedirect(){
    this.route.navigate(['admin/artist/new'])
  }
}

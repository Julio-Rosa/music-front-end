import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArtistModel } from '../../models/artist-model';
import { Router } from '@angular/router';
import { ArtistService } from '../../services/artist/artist.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  error: boolean = false;
  errorMessage: string = 'Ocorreu um erro!';

  success: boolean = false;
  successMessage: string;

  isModalOpen = false;
  message = 'Tem certeza que deseja deletar?????'

  users: User[] = [];
  noUsers: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  nameFilter: string = '';
  sortBy: string = 'createdAt';
  sortOrder: string = 'ASC';
  artistId: string = '';


  showConfirmationModal = false;

  @ViewChild('searchForm') searchForm!: NgForm;

  constructor(private userService:UserService, private route: Router) { }

  ngOnInit(): void {

    this.getUsers();
  }

  reset() {
    // this.noArtists = false;
    // this.getArtists();
  };
  getByName() {
    // this.noArtists = false;
    // this.artists.splice(0, this.artists.length);
    // this.userService.getAllByName(this.nameFilter).subscribe(data => {

    //   this.artists = data;

    // }, (error) => {
    //   if (error.status == 404) {
    //     this.noArtists = true;
    //   }
    // });
    // this.searchForm.resetForm();


  };
  getUsers() {
    this.userService.getAll().subscribe(data => {
      this.users = data;



    }, (error) => {
      if (error.status == 404) {
        this.noUsers = true;
      }else if (error.status == 403){
        this.error = true;
        this.errorMessage = 'Operação não permitida, redirecionando!'
        setTimeout(() => {
          this.error = false;
          this.route.navigate(['auth/login'])
        }, 5000)
      }
      else{
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000)
      }
     

    })

  };
  deleteById(id: string) {
    // this.artistService.deleteById(id).subscribe(result => {
     
    //  this.success = true;
    //  this.successMessage = 'Artista deletado!'

    //   setTimeout(() =>{
    //     this.success = false;
    //     this.reset();
    //   }, 3000)
      
     
  //   }, (error) => {
  //     if (error.status === 403) {
  //       this.errorMessage = error['error']['message'];
  //       this.error = true;
  //       setTimeout(() => {
  //         this.route.navigate(['auth/login'])
  //       }, 5000)
  //     }
  //   })
   };
 
  showDeleteModal(){
    // this.isModalOpen = true;
  }
 
  edit(artistId: string) {
    // this.route.navigate(['admin/artist/', artistId])
  }


  cancelDelete(){
    // this.isModalOpen = false;
  }
  confirmDelete(id:string){


    // this.isModalOpen = false;
    // this.deleteById(id);

  }

  newArtistRedirect(){
    // this.route.navigate(['admin/artist/new'])
  }

}

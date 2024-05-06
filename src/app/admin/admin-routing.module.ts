import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/users/users.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistComponent } from './components/artist/artist.component';
import { MusicEditComponent } from './components/music-edit/music-edit.component';
import { EditArtistComponent } from './artist/edit-artist/edit-artist/edit-artist.component';
import { NewComponent } from './artist/new/new.component';
import { NewUserComponent } from './components/users/user/new-user/new-user.component';
import { EditUserComponent } from './components/users/user/edit-user/edit-user.component';
import { MeComponent } from './components/me/me/me.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'artists', component: ArtistsComponent },
      {path:'users', component: UsersComponent},
      {path:'user/new', component: NewUserComponent},
      {path:'user/edit/:id', component: EditUserComponent},
      { path: 'artist/new', component: NewComponent },
      { path: 'artist/:id', component: ArtistComponent },
     
      {path: 'artist/edit/:id', component: EditArtistComponent},
      {path:'music/edit/:id', component: MusicEditComponent},
      {path:'me', component: MeComponent}
      
    ]
  },

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

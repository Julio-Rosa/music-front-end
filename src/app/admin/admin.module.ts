import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { NavComponent } from './components/nav/nav.component';
import { UsersComponent } from './components/users/users.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistModel } from './models/artist-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistInterceptor } from './interceptor/artist/artist.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArtistService } from './services/artist/artist.service';
import { MusicEditComponent } from './components/music-edit/music-edit.component';
import { EditArtistComponent } from './artist/edit-artist/edit-artist/edit-artist.component';
import { GenericModalComponent } from '../components/modal/generic-modal/generic-modal.component';
import { ErrorPopupComponent } from '../popup/error-popup/error-popup/error-popup.component';
import { SuccessPopupComponent } from '../popup/success-popup/success-popup/success-popup.component';
import { NewComponent } from './artist/new/new.component';
import { NewUserComponent } from './components/users/user/new-user/new-user.component';
import { EditUserComponent } from './components/users/user/edit-user/edit-user.component';
import { MeComponent } from './components/me/me/me.component';




@NgModule({

  declarations: [
    AdminComponent,
    NavComponent,
    UsersComponent,
    ArtistsComponent,
    ArtistComponent,
    MusicEditComponent,
    EditArtistComponent,
    GenericModalComponent,
    ErrorPopupComponent,
    SuccessPopupComponent,
    NewComponent,
    NewUserComponent,
    EditUserComponent,
    MeComponent
    
    
    
   
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [
   
    ArtistService,
    { provide: HTTP_INTERCEPTORS, useClass: ArtistInterceptor, multi: true }
  ]
 
})
export class AdminModule { }

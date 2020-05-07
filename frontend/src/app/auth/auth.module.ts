import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRegisterComponent } from './modals/modal-register/modal-register.component';
import { ModalLoginComponent } from './modals/modal-login/modal-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';



@NgModule({
  declarations: [ModalLoginComponent, ModalRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    StoreModule.forFeature('auth', authReducer),
  ],
  exports: [ModalLoginComponent, ModalRegisterComponent],
  providers: [AuthService],
})
export class AuthModule {}

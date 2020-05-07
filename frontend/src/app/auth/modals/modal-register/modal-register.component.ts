import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthState, getAuthState } from '../../store/auth/auth.reducer';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthenticateSuccess } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
})
export class ModalRegisterComponent implements OnInit, OnDestroy {
  @Input() modal;
  authState$: Observable<AuthState>;
  form: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(
    private toastController: ToastController,
    private authsService: AuthService,
    private store: Store<AuthState>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.authState$ = this.store.select(getAuthState);
  }

  validatePasswords() {
    let pass = this.form.get('password').value;
    let passConfirm = this.form.get('passwordConfirm').value;

    if (pass != passConfirm) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.subscriptions.add(
        this.authsService.register(this.form.value).subscribe(
          (data) => {
            this.closeModal();
            this.store.dispatch(new AuthenticateSuccess(data));
          },
          (error) => {
            this.presentToastErro(error.error);
          }
        )
      );
    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  async presentToastErro(error) {
    const toast = await this.toastController.create({
      message: error.message,
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }

  closeModal() {
    this.modal.dismiss();
  }
}

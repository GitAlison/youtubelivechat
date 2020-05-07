import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthState, getAuthState } from '../../store/auth/auth.reducer';
import { AuthenticateSuccess } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements OnInit, OnDestroy {
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
    });
  }
  ngOnInit() {
    this.authState$ = this.store.select(getAuthState);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.subscriptions.add(
        this.authsService.login(this.form.value).subscribe(
          (data) => {
            this.closeModal();
            this.store.dispatch(new AuthenticateSuccess(data));
          },
          (error) => {
            console.log(error);
            this.presentToastErro();
          }
        )
      );
    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  async presentToastErro() {
    const toast = await this.toastController.create({
      message: 'Algo deu errado, Tente Novamente.',
      duration: 2000,
    });
    toast.present();
  }

  closeModal() {
    this.modal.dismiss();
  }
}

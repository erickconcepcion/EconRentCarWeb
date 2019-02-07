import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { MessageBoxService } from '../../shared/dynamic-crud/message-dialog/MessageBox.service';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  submitted: boolean;
  isRequesting: boolean;
  errors: string;
  returnUrl: any;
  login: FormGroup;
  subscription: Subscription;
  loginSubscription: Subscription;

  constructor(private userService: UserService, private mesageBox: MessageBoxService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.returnUrl = param['returnUrl'];
      });
      this.userService.logout();
      this.login = this.formBuilder.group({
        email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        password: ['', Validators.required]
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onLogin() {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    const newPath = this.returnUrl === undefined ? '' : this.returnUrl;
    if (this.login.valid) {
      this.userService.login(this.login.value.email, this.login.value.password)
        .pipe(
          finalize(() => this.isRequesting = false)
        )
        .subscribe(
          result => {
            if (result) {
              this.router.navigateByUrl(newPath);
            }
          });
    } else {
      this.validateAllFormFields(this.login);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

}

import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

import { ICanLeavePage } from '../../models/Can-Leave-page';
import {isEqual} from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, ICanLeavePage{
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {
    // if (localStorage.getItem('userToken') !== null) {
    //   _Router.navigate(['home']);
    // }
  }
  initialFormValue: any;
  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(
    event: BeforeUnloadEvent
  ): void {
    if (event && !this.canLeavePage()) {
      event.preventDefault();
      event.returnValue = false;
    }
  }
  ngOnInit(): void {
    this.initialFormValue = this.registerForm.value;
    console.log(this.initialFormValue);
  }
  canLeavePage= () => {
    console.log("enter")
    const currentFormValue = this.registerForm.value;
    const noChanges=isEqual(currentFormValue,this.initialFormValue)
    if (noChanges) return true;

    return confirm('Are you sure you want to leave the page?');
  };

  isLoading: boolean = false;
  apiError: string = '';
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      ]),
    },
    { validators: this.passwordConfirmMatch }
  );

  passwordConfirmMatch(registerForm: any) {
    let passwordControl = registerForm.get('password');
    let passwordConfirmControl = registerForm.get('passwordConfirm');
    if (passwordControl.value == passwordConfirmControl.value) {
      return null;
    } else {
      passwordConfirmControl.setErrors({
        passwordmatch: 'password and password Confirm not match',
      });
      return { passwordmatch: 'password and password Confirm not match' };
    }
  }

  registerUser(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthenticationService.register(registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;

          this._Router.navigate(['users/login']);
        },
        error: (err) => {
          this.isLoading = false;
          if (
            err.status === 400 &&
            err.error &&
            err.error.message === 'User already exists'
          ) {
            this.apiError =
              'User with this email already exists. Please choose a different email.';
          } else {
            this.apiError =
              'An unexpected error occurred. Please try again later.';
          }
        },
      });
    }
  }
}

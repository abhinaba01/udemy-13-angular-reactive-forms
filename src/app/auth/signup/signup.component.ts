import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
import { RoleType } from '../role.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),

    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    }),

    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),

    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),

    role: new FormControl<RoleType>('student', {
      validators: [Validators.required],
    }),

    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    agree: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  // sameAsPassword(control: AbstractControl) {
  //   if (control.value.confirmPassword === this.form.value.password) {
  //     return null;
  //   }
  //   return { confirmPasswordNotsameasPassword: true};
  // }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const enteredEmail = this.form.value.email;
    // const enteredPassword = this.form.value.password;

    console.log(this.form);
    // console.log(enteredEmail, enteredPassword);
  }
  onReset() {
    this.form.reset();
    console.log(this.form);
  }
}

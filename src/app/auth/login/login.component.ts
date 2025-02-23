import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

function emailIsUnique(control:AbstractControl){
  if(control.value !== 'test@example.com'){
   return of(null)
  }
   return of({notUnique:true})
}



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})



export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators:[emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6),this.containsQuestionMark],
      
    }),
  });


  ngOnInit(){

    const savedForm = window.localStorage.getItem('saved-login-form');
    if(savedForm){
      const loadedForm = JSON.parse(savedForm);
      this.form.setValue({
        email: loadedForm.email,
        password: ''
      }) 
    }
    this.form.valueChanges.subscribe({
      next: value =>{
        if( this.form.controls.email.valid){
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({email: value.email})
        )}
        else{
           window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({email: ''})
        )
        }
      }
    })
  }

  containsQuestionMark(control: AbstractControl){
    if(control.value.includes('?')){
      return null;
    }
    return {doesNotContainQuestionMark:true}
  
  }

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const eneteredPassword = this.form.value.password;

    console.log(enteredEmail, eneteredPassword);

    window.localStorage.setItem(
      'set-email',
      JSON.stringify({
        email: this.form.value.email,
      })
    );
  }
}

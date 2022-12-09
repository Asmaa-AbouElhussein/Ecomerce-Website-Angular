import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Component/User/user/Services/account.service';
// import { ConfirmPassword } from 'src/app/Component/Shared/shared/Validators/confirm-password';
import { AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  zipcode: any
  constructor(private router: Router, private fb: FormBuilder,
    private accountService: AccountService,) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required]
      })

    }, { validators: [this.confirmPasswordValidator] });
  }

  confirmPasswordValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmpassword = control.get('confirmPassword');
    if (password?.pristine || confirmpassword?.pristine) {
      return null;
    }
    else {
      return password && confirmpassword && password.value != confirmpassword.value ?
        { 'misMatch': true } : null;
    }
  }

  onSubmit() {
    debugger
    console.log(this.registerForm.value);
    this.registerForm.value.address.zipCode = this.registerForm.value.address.zipCode.toString()
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('/home');
      alert('register is success')
    });
  }

}

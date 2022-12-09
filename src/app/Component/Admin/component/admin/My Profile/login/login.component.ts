import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Component/Admin/Services/auth.service';
import { AccountService } from 'src/app/Component/User/user/Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;
  constructor(private fb: FormBuilder, private accountService: AccountService,
    private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.initialData();
    this.createLoginForm();
  }

  initialData() {
    var _token = localStorage.getItem("token");

    if (_token != null) {
      this.router.navigate(['admin/Dashboart/category']);
    }

  }


  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(user: any) {

    this.authService.login(user)
      .subscribe((reponse: any) => {

        localStorage.setItem('displayName', reponse.displayname);
        localStorage.setItem('token', reponse.token);
        alert('login success')
        this.router.navigate(['admin/Dashboart/category']);

      })

  }



}

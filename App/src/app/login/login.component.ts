import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  getlogin(): any{
    console.log(this.loginForm.value);
    this.auth.getlogin(this.loginForm.value)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token);
        this.router.navigate(['/event']);
      }
    );
  }

}

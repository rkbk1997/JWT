import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup = new FormGroup({
    email : new  FormControl(null, [Validators.required]),
    password : new FormControl(null, [Validators.required])
  });

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  getvalue(): any{
    console.log(this.regForm.value);
    this.auth.addUser(this.regForm.value).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from '../helpers/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  imageSrc = 'assets/images/logo.png';
  imageAlt = 'Logo';
  loading = false;
  json: string | undefined;

  public signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Email: ['', Validators.email],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      // confpwd:['']
    });

    //get user id from local storage
    let userId = localStorage.getItem('userId');

    if (userId !== null) {
      this.router.navigate(['/todo']);
      this.toastr.error('Please logout first!', 'Error');
    }
    this.loading = false;
  }
  signUp() {
    this.loading = true;
    //check to see if passwords match
    if (
      this.signupForm.value.Password !== this.signupForm.value.ConfirmPassword
    ) {
      this.loading = false;
      this.toastr.error('Passwords do not match!', 'Error');
      return;
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');

    const postUserData = {
      username: this.signupForm.value.Username,
      email: this.signupForm.value.Email,
      password: this.signupForm.value.Password,
      name: this.signupForm.value.Username,
    };

    this.http
      .post<any>(Utils.BASE_URL + 'user', postUserData, { headers: header })
      .subscribe(
        (res) => {
          this.toastr.success('Signup Successful', 'Success');

          //wait for 3 seconds
          setTimeout(() => {
            this.signupForm.reset();
            this.router.navigate(['login']);
          }, 3000);
        },
        (err: any) => {
          this.toastr.error('Signup failed, ' + err.error.message, 'Error');
          this.router.navigate(['signup']);
          this.loading = false;
        }
      );
  }
}

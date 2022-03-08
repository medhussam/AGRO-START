import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from 'app/_services/user.service';
import { ExploitationService } from 'app/_services/exploitation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private expService: ExploitationService
  ) { 
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: (user) => {
                let exp
                
                this.expService.getExploitations().subscribe(item=>{
                    console.log(item['features']);
                   exp = item['features'];
                   if (exp == null){
                    this.router.navigate(['/pages/Adminstrator/exploitation']);
                 
                } else{
                    this.router.navigate(['/']);
                 
                }
              
                  });
                // this.userService.getAll().subscribe({
                //     next: (data) => {
                //         exp = data  
                //       console.log(data);
      
                //     }
                // });
               

                
               // this.router.navigate([returnUrl]); 
               // console.log(user);

                //   const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                //   this.router.navigate([returnUrl]);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }

}

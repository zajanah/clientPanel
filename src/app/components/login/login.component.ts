import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthClientService,
    private flashMessage: FlashMessagesService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        return this.route.navigate(['/'])
      }
    })
  }

  onLogin() {
    this.authService.login(this.email, this.password)
      .then(auth => {
        if (auth) {
          this.flashMessage.show('you are logged successfly', {
            cssCalss: "alert-success", timeout: 500
          })
          this.route.navigate([''])
        }
      })
      .catch(error => {
        this.flashMessage.show(error.message, {
          cssClass: "alert-danger", timeout: 10000
        })
      })
  }
  onLoginWithGoogle() {
    this.authService.loginWithGoolgle()
      .then(auth => {
        if (auth) {
          this.flashMessage.show('you are logged successfly', {
            cssCalss: "alert-success", timeout: 500
          })
          this.route.navigate([''])
        }
      })
      .catch(error => {
        this.flashMessage.show(error.message, {
          cssClass: "alert-danger", timeout: 10000
        })
      })
  }

}

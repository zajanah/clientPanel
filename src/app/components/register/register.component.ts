import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authClient: AuthClientService,
    private route: Router,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit(): void {
  }


  onRegister() {
    this.authClient.register(this.email, this.password).
      then(register => {

        this.flashMessage.show("Conguratulation you are loggeed", {
          cssClass: 'alert-success', timeout: 5000
        })
        this.route.navigate[('/')]

      }).catch(error => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger', timeout: 5000
        })
      })
  }
}

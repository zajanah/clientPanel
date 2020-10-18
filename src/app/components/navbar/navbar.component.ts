import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = true;
  userLoggedIn: string;

  constructor(
    private authService: AuthClientService,
    private flashmessage: FlashMessagesService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.userLoggedIn = auth.email
      } else {
        this.isLoggedIn = false
      }
    })
  }

  onLogOut() {
    this.authService.logOut();
    this.isLoggedIn = false
    return this.route.navigate(['/login'])
  }

}

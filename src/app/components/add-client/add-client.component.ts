import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: 0,
    user: ''
  }

  constructor(
    private clientService: ClientService,
    private authClientService: AuthClientService,
    private route: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth => {
      this.client.user = auth.uid
    })
  }

  addClient() {
    this.clientService.newClient(this.client);

    this.flashMessages.show('client added successfly. ', {
      cssClass: 'alert-success', timeout: 5000
    });

    return this.route.navigate(['/'])
  }

}

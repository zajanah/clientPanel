import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    balance: 0
  };

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    })
  }

  onSubimt() {
    this.client.id = this.id
    this.clientService.updateClient(this.client);
    this.flashMessages.show('Client Updated ', { cssClass: 'alert-success', timout: 80000 })
    this.router.navigate(['/'])

  }
}

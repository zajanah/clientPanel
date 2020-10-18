import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {

  showBalance: boolean = false;
  id: string;
  client: Client;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    //reuperer l'id 
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    })
  }

  onSubmit() {
    this.client.id = this.id
    this.clientService.updateClient(this.client);
    this.flashMessages.show('balance updated', { cssClass: 'alert-warning', timout: 10000 })
  }

  deleteClient(id: string) {
    if (confirm('Are you sure to delete this client?')) {
      this.clientService.deleteClient(id);
      this.flashMessages.show('Client Deleted ', { cssClass: 'alert-danger', timout: 80000 })
      this.router.navigate(['/'])
    }
  }



}

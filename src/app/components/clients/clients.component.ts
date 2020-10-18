import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { ClientService } from 'src/app/services/client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  searchClients: Client[];
  total: number = 0;


  constructor(
    private clientService: ClientService,
    private authClient: AuthClientService,
    private flashMessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.authClient.getAuth().subscribe(auth => {
      this.clientService.getClients(auth.uid).subscribe(clients => {
        this.searchClients = this.clients = clients
        this.total = this.getTotal()
      })

    })
  }


  search(query: string) {
    this.searchClients = (query) ? this.clients.filter(client =>
      (client.firstName.toLowerCase().includes(query.toLowerCase()))
      || client.lastName.toLowerCase().includes(query.toLowerCase())
      || client.email.toLowerCase().includes(query.toLowerCase()))
      : this.clients;
  }


  getTotal() {
    return this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0)
  }

  deleteClient(id: string) {

    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.clientService.deleteClient(id);
        this.flashMessages.show('Client Deleted ', { cssClass: 'alert-danger', timout: 80000 })
        this.router.navigate(['/'])

        swal.fire({
          title: 'deleted',
          text: 'this client is deleted!',
          icon: 'success',
          timer: 2000
        })

      }
    })
  }



}

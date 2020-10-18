import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientsDoc: AngularFirestoreDocument<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients');
  }

  getClients(user: string): Observable<Client[]> {
    return this.afs.collection('clients', ref => ref.where('user', '==', user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    return this.clientsCollection.doc(id).valueChanges();
  }

  updateClient(client: Client) {
    this.clientsDoc = this.clientsCollection.doc(client.id);
    this.clientsDoc.update(client);
  }

  deleteClient(id: string) {
    this.clientsDoc = this.clientsCollection.doc(id);
    this.clientsDoc.delete();
  }



}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Prestadores, Services } from '../core/models/prestadores/prestador.model';

export enum Operation { Add = 1, Edit = 2 }
export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})

export class ProvidersServices {

  private itemDoc: AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
  }

  addOrUpdateService(prestadores: Prestadores, operation: Operation) {
    if (operation === Operation.Add) {
    this.afs.collection('providers').add({...prestadores});
    } else {
      this.afs.doc<Prestadores>(`providers/${prestadores['id']}`).update(prestadores);
    }
  }

  addOrUpdateServiceUc(services: Services, operation: Operation) {
    if (operation === Operation.Add) {
    this.afs.collection('services').add({...services});
    } else {
      this.afs.doc<Prestadores>(`services/${services['id']}`).update(services);
    }
  }

  listServicesForProvider(): Observable<DocumentChangeAction<Prestadores>[]> {
    return this.afs.collection<Prestadores>('providers').snapshotChanges();
  }

  eliminarItem(item) {
    this.itemDoc = this.afs.doc<Prestadores>(`providers/${item.id}`);
    this.itemDoc.delete();
  }

  EditarItem(services) {
    this.itemDoc = this.afs.doc<Item>(`services/${services.id}`);
    this.itemDoc.update(services);
  }
}

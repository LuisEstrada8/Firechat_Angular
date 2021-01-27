import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { Mensaje } from "../../app/interface/mensaje.interface";
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  

  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore, public auth: AngularFireAuth) { 

this.auth.authState.subscribe(data=>{
  console.log('estado del ususario',data);

  if(!data){
    return;
  }else{
    this.usuario.nombre = data.displayName;
    this.usuario.uid = data.uid;
  }
  
})

  }

  cargaMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5));
  
    return this.itemsCollection.valueChanges().pipe(
                                map((mensajes: Mensaje[])=>{
                                  console.log(mensajes)
                                  
                                  this.chats =[];

                                  for(let mensaje of mensajes){
                                    this.chats.unshift(mensaje);
                                  }

                                  return this.chats;  
                                }))
                                
  }

  agregarMensaje( texto: string ){
    
    let mensaje: Mensaje = {

      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,

    }

   return this.itemsCollection.add(mensaje);

  }

  login(proveedor: string) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }


  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

}

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

mensaje: string="";
elemento: any;


  constructor( public _cs:ChatService ) { 

this._cs.cargaMensajes()
        .subscribe( ()=> this.elemento.scrollTop = this.elemento.scrollHeight );

  }

 ngOnInit(){
    
  this.elemento = document.getElementById('app-mensajes');

 }


  enviar_mensaje(){
  console.log(this.mensaje);

  if(this.mensaje.length ==0){

  }else{
    this._cs.agregarMensaje(this.mensaje).then(()=>this.mensaje="").catch((err)=>console.error('Error', err)
    )
  }

  }
}

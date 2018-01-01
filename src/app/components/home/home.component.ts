import { Component, OnInit } from '@angular/core';
import {PedidosService} from '../../services/pedidos.service';

//imports para el calendario
import 'fullcalendar';
import { ScheduleModule } from 'primeng/primeng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  events: any[] =[];
  header:any;
  pedidos:any[]=[];

  constructor(
    private _pedidosService:PedidosService) { }

  ngOnInit() {
      this.getPedidos();
    this.header = {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
    };
  }

  getPedidos(){

      return this._pedidosService.getPedidos().subscribe( pedidos =>{
       this.pedidos=pedidos;

       this.fillSchedule(this.pedidos);
    });
  }

  fillSchedule(pedidos){

    for(let pedido of pedidos){
      let fecha_entrega = new Date(pedido.fecha_entrega);
      let  evento:any={

        id: pedido.pedidoId,
        title: pedido.cliente.nombre,
        start: pedido.fecha_entrega,
        end: pedido.fecha_devolucion,
        allDay:true

      }

    this.events.push(evento);

    }
  }

}

export class Event {

    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;

}
export class Pedido  {

    constructor(
      public pedidoId?,
      public num_serie?,
      public descripcion?,
      public fecha_pedido?,
      public fecha_entrega?,
      public fecha_devolucion?,
      public valor?,
      public fecha_pago?,
      public transporte?,
      public valor_transporte?,
      public cliente?,
      public dias_alquiler?,
      public direccion?
     ) {}
}

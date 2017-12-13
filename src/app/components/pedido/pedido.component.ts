import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../services/clientes.service';
import {PedidosService} from '../../services/pedidos.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html'
})
export class PedidoComponent {

  selectedCliente:any = [];
  clientes:SelectItem [] = [];
  pedido:Pedido = {};
  fecha:Date;
  dates: Date[];

  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;

  invalidDates: Array<Date>;

  es: any;

  constructor(private _clientesService:ClientesService,
                private _pedidosService:PedidosService
            ) {

    this.selectedCliente=null
    this.getClientes();

  }
  ngOnInit() {
        this.es = {
        	firstDayOfWeek: 1,
        	dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        	dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        	dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        	monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        };

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];
    }

  //se llena el Dropdown
  getClientes(){

      this.clientes.push( {label:'Seleccionar Cliente', value:null});
      this._clientesService.getClientes().subscribe( clientes =>{
      for(let cliente of clientes){
          this.clientes.push({label:cliente.nombre+" "+cliente.apellido, value:cliente })
      }


    });
  }

  createPedido(){


    if(this.selectedCliente!=null){

        this.pedido.cliente = this.selectedCliente;
        this._pedidosService.createPedido(this.pedido).subscribe(success => {

        },
        error=>{

        },()=>{

        });


    }
  }

}

export class Pedido  {

    constructor(
      public num_serie?,
      public descripcion?,
      public fecha_pedido?,
      public fecha_entrega?,
      public fecha_devolucion?,
      public valor?,
      public fecha_pago?,
      public transporte?,
      public valor_transporte?,
      public cliente?
     ) {}
}

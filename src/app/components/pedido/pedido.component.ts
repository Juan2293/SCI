import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../services/clientes.service';
import {ProductosService} from '../../services/productos.service';
import {PedidosService} from '../../services/pedidos.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html'
})
export class PedidoComponent {

//selectInput dropdown
  selectedCliente:any=[];
  selectedProducto:any=[];
  clientes:SelectItem[]=[];
  productos:SelectItem[]=[];
//datatable
  pedidoProductoDT:PedidoProducto[]=[];

  pedidoProducto:PedidoProducto = {};
  //pedido
  pedido:Pedido = {};

  //rango fechas entrega y devolución
  rangoFechas:Date[];

  sumaValorProductos:number=0;


  constructor(private _clientesService:ClientesService,
              private _pedidosService:PedidosService,
              private _productosService:ProductosService
            ) {

    this.selectedCliente=null
    this.getClientes();
    this.selectedProducto=null
    this.getProductos();


    this.pedido.fecha_pedido = new Date();
    this.pedido.valor=0;
    this.pedido.valor_transporte=0;
  }

  presiono(){

    if(this.selectedProducto){

    this.pedidoProducto.producto = this.selectedProducto;
    this.pedidoProductoDT = [...this.pedidoProductoDT,this.pedidoProducto]; // se agrega el producto al array del DataTable

    //se quita el producto del dropdown
    let index:number
    for( let i=1; i<this.productos.length; i++){
      if(this.productos[i].value==this.selectedProducto){
      index=i;
      this.productos = this.productos.filter((val,i) => i!=index);
      }
  }
    this.selectedProducto = ''; // se reinicia el dropdown
    this.pedidoProducto = new PedidoProducto(); // se limpia el pedidoProducto
    this.calcularPrecioProductos();

  }
}
// setInterval(() => {
//   this._CurrenciesService.getCurrencies().subscribe(data => {
//     this.currencies = data;
//   });
// }, 10000);
calcularPrecioProductos() {


this.sumaValorProductos=0;

    if(this.pedidoProductoDT) {


        for(let producto of this.pedidoProductoDT) {
            console.log(producto.valor)
          if(producto.cantidad>0){
                this.sumaValorProductos += producto.valor*producto.cantidad;
            }
        }
    }
    this.pedido.valor=this.sumaValorProductos;

    if(this.pedido.transporte)
    this.calcularTotalConTransporte()

    if(this.pedido.dias_alquiler)
    this.pedido.valor = this.pedido.valor*this.pedido.dias_alquiler;

  }

calcularTotalConTransporte(){

      if(!this.pedido.transporte){
          this.pedido.valor_transporte=0;
      }

      this.pedido.valor=this.sumaValorProductos;

      if(this.pedido.transporte  && this.pedido.transporte>=0)
      this.pedido.valor=this.pedido.valor+this.pedido.valor_transporte;

}
  guardarPedido(){

    this.pedido.cliente=this.selectedCliente;
    console.log(this.pedido);
  }
  removeDataTable(index,pedidoProducto){
    this.pedidoProductoDT = this.pedidoProductoDT.filter((val,i) => i!=index);
    this.productos.push({label:pedidoProducto.producto.nombre, value:pedidoProducto.producto })
    this.calcularPrecioProductos();
 }


// poner el value del producto
  onChangeProducto(){
      if(!this.selectedProducto){
        this.pedidoProducto.valor=0;
      }else{
      this.pedidoProducto.valor = this.selectedProducto.valor;
    }
  }
  ngOnInit() {}

  //se llena el Dropdown
  getClientes(){

      this.clientes.push( {label:'Seleccionar Cliente', value:null});
      this._clientesService.getClientes().subscribe( clientes =>{
      for(let cliente of clientes){
          this.clientes.push({label:cliente.nombre+" "+cliente.apellido, value:cliente })
      }


    });
  }

  calcularDias(){

    if((this.rangoFechas[1]!=this.pedido.fecha_devolucion  &&
      !this.rangoFechas[1] &&
      this.rangoFechas[0]) || (this.rangoFechas[0] && !this.rangoFechas[1])
     )
    {
      this.pedido.fecha_devolucion=null;
      this.pedido.dias_alquiler=1;
      this.calcularPrecioConDias();
    }
    else if(this.rangoFechas[0] && this.rangoFechas[1]){
      this.pedido.fecha_entrega=this.rangoFechas[0];
      this.pedido.fecha_devolucion=this.rangoFechas[1];

          if(this.pedido.fecha_entrega && this.pedido.fecha_devolucion) {


            let _MS_PER_DAY = 1000 * 60 * 60 * 24;
            let utc1  =
              Date.UTC(this.pedido.fecha_entrega.getFullYear(),
                        this.pedido.fecha_entrega.getMonth(),
                        this.pedido.fecha_entrega.getDate()
                      );

            let utc2 =
                Date.UTC(this.pedido.fecha_devolucion.getFullYear(),
                this.pedido.fecha_devolucion.getMonth(),
                this.pedido.fecha_devolucion.getDate()
              );

            this.pedido.dias_alquiler = Math.floor((utc2 - utc1) / _MS_PER_DAY)+1;
            this.calcularPrecioConDias();
        }

    }

  }

  calcularPrecioConDias(){

    this.pedido.valor=this.sumaValorProductos;
    this.pedido.valor = this.pedido.valor*this.pedido.dias_alquiler;
  }

  getProductos(){
    this.productos.push({label:'Seleccionar Producto',value:null});
    this._productosService.getProductos().subscribe(productos=>{

      for(let producto of productos){
          this.productos.push({label:producto.nombre, value:producto })
      }
    })
  }
  createPedido(){


    if(this.selectedCliente!=null){

        let pedidoDTO:pedidoDTO = {}
        pedidoDTO.pedido=this.pedido;
        pedidoDTO.pedidoProductos=this.pedidoProductoDT;
        console.log(pedidoDTO.pedidoProductos);
        this.pedido.cliente = this.selectedCliente;
        this._pedidosService.createPedido(pedidoDTO).subscribe(success => {
          console.log('success');
          console.log(success);
        },
        error=>{
          console.log("error");
          console.log(error);
        },()=>{

        });


    }
  }

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

class PedidoProducto{
    constructor(
      public pedido?,
      public producto?,
      public valor?,
      public cantidad?
    ){}
}
class pedidoDTO{
  constructor(
    public pedido?,
    public pedidoProductos?
    ){}
}

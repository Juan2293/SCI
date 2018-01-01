import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../services/clientes.service';
import {ProductosService} from '../../services/productos.service';
import {PedidosService} from '../../services/pedidos.service';
import {SelectItem} from 'primeng/primeng';
import {FormGroup,FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MensajesService} from '../../services/mensajes.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html'
})
export class PedidoComponent {
//mensaje
  msgs:any[]=[];
//Validaciones formulario
  pedidoForm:FormGroup;
  valorEditableDT:any=0;
//información  dropdown
  clientes:SelectItem[]=[];
  productos:SelectItem[]=[];
//información de los elementos seleccionados
  selectedCliente:any=[];
  selectedProducto:any=[];
//datatable
  pedidoProductoDT:PedidoProducto[]=[];
  pedidoProducto:PedidoProducto = {};
  //pedido
  pedido:Pedido = {};
  //rango fechas entrega y devolución
  rangoFechas:Date[]=[];
  sumaValorProductos:number=0;


  constructor(private _clientesService:ClientesService,
              private _pedidosService:PedidosService,
              private _productosService:ProductosService,
              private formBuilder: FormBuilder,
              private _mensajesService:MensajesService){

          this.pedidoForm = this.formBuilder.group({
            'cliente': new FormControl('', Validators.required),
            'pedidoProducto': new FormGroup({
                  'producto': new FormControl(''),
                  'cantidad': new FormControl(''),
                  'valor': new FormControl('')
            }),
            'direccion': new FormControl('', Validators.required),
            'fecha_pedido': new FormControl(new Date(), Validators.required),
            'fecha_entrega': new FormControl(''),
            'fecha_devolucion': new FormControl(''),
            'rangoFechas': new FormControl('',Validators.required),
            'dias_alquiler': new FormControl('', Validators.required),
            'transporte': new FormControl(''),
            'valor_transporte': new FormControl(''),
            'valor': new FormControl(0, Validators.required),
            'descripcion': new FormControl()


          });

        this.selectedCliente=null
        this.getClientes();
        this.selectedProducto=null
        this.getProductos();

  }
  ngOnInit() {}

  createPedido(){

    this.pedido.cliente = this.pedidoForm.get('cliente').value;
    this.pedido.descripcion = this.pedidoForm.get('descripcion').value;
    this.pedido.fecha_pedido = this.pedidoForm.get('fecha_pedido').value;
    this.pedido.fecha_entrega = this.pedidoForm.get('fecha_entrega').value;
    this.pedido.fecha_devolucion = this.pedidoForm.get('fecha_devolucion').value;
    this.pedido.dias_alquiler = this.pedidoForm.get('dias_alquiler').value;
    this.pedido.transporte = this.pedidoForm.get('transporte').value;
    this.pedido.valor_transporte = this.pedidoForm.get('valor_transporte').value;
    this.pedido.valor = this.pedidoForm.get('valor').value;
    this.pedido.direccion = this.pedidoForm.get('direccion').value;

    if(this.selectedCliente!=null){

        let pedidoDTO:pedidoDTO = {}
        pedidoDTO.pedido=this.pedido;
        pedidoDTO.pedidoProductos=this.pedidoProductoDT;
        this.pedido.cliente = this.selectedCliente;
        this._pedidosService.createPedido(pedidoDTO).subscribe(success => {

        },
        error=>{
          this.msgs = this._mensajesService.showSuccess('Se creó el pedido')
        },()=>{
        });
    }
  }
  calcularPrecioProductos() {
    this.sumaValorProductos=0;
        if(this.pedidoProductoDT) {
            for(let producto of this.pedidoProductoDT) {
              if(producto.cantidad>0){
                    this.sumaValorProductos += producto.valor*producto.cantidad;
                }
            }
        }
        this.calcularValorTotal();
  }

  calcularValorTotal(){
    // var greeting = "Good" + ((now.getHours() > 17) ? " evening." : " day.");
    let valor =  this.sumaValorProductos;
    if(this.pedidoForm.get('dias_alquiler').value){
      valor = valor*this.pedidoForm.get('dias_alquiler').value;
    }
    if(this.pedidoForm.get('transporte').value && this.pedidoForm.get('valor_transporte').value){
      valor=valor+this.pedidoForm.get('valor_transporte').value;
    }
    this.pedidoForm.get('valor').setValue(valor);
  }

  calcularTotalConTransporte(){

        if(!this.pedidoForm.get('transporte').value){
            this.pedidoForm.get('valor_transporte').reset();
            this.pedidoForm.get('valor_transporte').setValidators(null);
            this.pedidoForm.get('valor_transporte').setErrors(null);
        }
         this.calcularValorTotal();

        if(this.pedidoForm.get('transporte').value  &&
         this.pedidoForm.get('valor_transporte').value>=0){
           //se pone la validación al campo valor transporte
           this.pedidoForm.get('valor_transporte').setValidators([Validators.required]);
           this.calcularValorTotal();
        }

  }
calcularDias(){
  console.log(this.rangoFechas);
  this.rangoFechas[0] = this.pedidoForm.get('rangoFechas').value[0];
  this.rangoFechas[1] = this.pedidoForm.get('rangoFechas').value[1];


      if((this.rangoFechas[1]!=this.pedidoForm.get('fecha_devolucion').value  &&
        !this.rangoFechas[1] && this.rangoFechas[0]) ||
        (this.rangoFechas[0] && !this.rangoFechas[1]))
      {
        this.pedidoForm.get('fecha_devolucion').setValue(null);
        this.pedidoForm.get('fecha_entrega').setValue(this.rangoFechas[0]);
        this.pedidoForm.get('fecha_devolucion').setValue(this.rangoFechas[0]);
        this.pedidoForm.get('dias_alquiler').setValue(1);

        this.calcularValorTotal();
      }
      else if(this.rangoFechas[0] && this.rangoFechas[1]){
        this.pedidoForm.get('fecha_entrega').setValue(this.rangoFechas[0]);
        this.pedidoForm.get('fecha_devolucion').setValue(this.rangoFechas[1]);

            if(this.pedidoForm.get('fecha_entrega').value && this.pedidoForm.get('fecha_devolucion').value) {


              let _MS_PER_DAY = 1000 * 60 * 60 * 24;
              let utc1  =
                Date.UTC(this.pedidoForm.get('fecha_entrega').value.getFullYear(),
                          this.pedidoForm.get('fecha_entrega').value.getMonth(),
                          this.pedidoForm.get('fecha_entrega').value.getDate()
                        );

              let utc2 =
                  Date.UTC(this.pedidoForm.get('fecha_devolucion').value.getFullYear(),
                  this.pedidoForm.get('fecha_devolucion').value.getMonth(),
                  this.pedidoForm.get('fecha_devolucion').value.getDate()
                );

              this.pedidoForm.get('dias_alquiler').setValue(Math.floor((utc2 - utc1) / _MS_PER_DAY)+1);
              // this.calcularPrecioConDias();
              this.calcularValorTotal();
          }

      }

    }

resetPedidoProductoForm(){
  this.pedidoForm.controls['pedidoProducto'].reset();
  //se quitan las validaciones de los campos para añadir producto si no hay ningun producto seleccionado
  this.pedidoForm.controls['pedidoProducto'].get('valor').setValidators(null);
  this.pedidoForm.controls['pedidoProducto'].get('cantidad').setValidators(null);
  this.pedidoForm.controls['pedidoProducto'].get('valor').setErrors(null);
  this.pedidoForm.controls['pedidoProducto'].get('cantidad').setErrors(null);
}
// poner el value del producto
  onChangeProducto(){
      this.selectedProducto = this.pedidoForm.controls['pedidoProducto'].get('producto').value;
      if(!this.selectedProducto){
        //se limpian los campos cuando el producto es null
          this.resetPedidoProductoForm();
      }else if(this.selectedProducto){
        //se validan los campos para añadir producto si hay uno seleccionado.
          this.pedidoForm.controls['pedidoProducto'].get('valor').setValidators(
                  [Validators.required]);
          this.pedidoForm.controls['pedidoProducto'].get('cantidad').setValidators(
                        [Validators.required]);
          this.pedidoForm.controls['pedidoProducto'].get('valor').setValue(this.selectedProducto.valor);
          this.pedidoForm.controls['pedidoProducto'].get('cantidad').setValue(1);
    }
  }

  onChangeCliente(){
    this.selectedCliente = this.pedidoForm.controls['cliente'].value;
    if(this.selectedCliente!=null)
        this.pedidoForm.get('direccion').setValue(this.selectedCliente.direccion);
  }

  addProductoDT(){
    this.pedidoProducto = this.pedidoForm.controls['pedidoProducto'].value;

    if(this.selectedProducto){

    this.pedidoProductoDT = [...this.pedidoProductoDT,this.pedidoProducto]; // se agrega el producto al array del DataTable

    //se quita el producto del dropdown
    this.removeProductoDropDown();
    //se calcula elprecio
    this.calcularPrecioProductos();
    // se limpian los campos
    this.resetPedidoProductoForm();
    // para que el boton se inhabilite
    this.selectedProducto=null;
  }
}
removeDataTable(index,pedidoProducto){
      this.pedidoProductoDT = this.pedidoProductoDT.filter((val,i) => i!=index);
      this.productos.push({label:pedidoProducto.producto.nombre, value:pedidoProducto.producto })
      this.calcularPrecioProductos();
   }

removeProductoDropDown(){
  if(this.selectedProducto){
      let index:number
        for( let i=1; i<this.productos.length; i++){
          if(this.productos[i].value==this.selectedProducto){
          index=i;
          this.productos = this.productos.filter((val,i) => i!=index);
          }
      }
  }
}

  //se llena el Dropdown productos
  getProductos(){
    this.productos.push({label:'Seleccionar Producto',value:null});
    this._productosService.getProductos().subscribe(productos=>{

      for(let producto of productos){
          this.productos.push({label:producto.nombre, value:producto })
      }
    })
  }

  //se llena el Dropdown clientes
  getClientes(){

      this.clientes.push( {label:'Seleccionar Cliente', value:null});
      this._clientesService.getClientes().subscribe( clientes =>{
      for(let cliente of clientes){
          this.clientes.push({label:cliente.nombre+" "+cliente.apellido, value:cliente })    }
    });
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

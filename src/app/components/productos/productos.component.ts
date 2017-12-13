import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../services/productos.service';
import {MensajesService} from '../../services/mensajes.service';
import {ConfirmationService} from 'primeng/primeng';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos:any[]=[];
  newProducto:boolean;
  producto:Producto ={ };
  msgs:any[]=[];
  constructor(
    private _productosService:ProductosService,
    private _mensajesService:MensajesService,
    private _confirmationService:ConfirmationService
  ) {}

  ngOnInit() {
    this.getProductos();
    //console.log(this.productos);
  }

  confirm(producto:any) {
      this._confirmationService.confirm({
          message: 'Quieres eliminar el producto <strong>'+ producto.nombre+'</strong>?',
          accept: () => {
                this.producto = this.cloneProducto(producto);
                this.deleteProducto(this.producto);
          }
      });
  }

  getProductos(){
    this._productosService.getProductos().subscribe( productos=>{
    this.productos = productos;
    });
  }

  showDialogToAdd() {
          this.newProducto = true;
          this.producto = new Producto();
    }

  selectProducto(producto:any){
    this.newProducto=false;
    this.producto= this.cloneProducto(producto);
  }

  cloneProducto(p: any): any {
    let producto = new Producto();
    for(let propiedad in p) {
        producto[propiedad] = p[propiedad];
    }
    return producto;
}

    save(){

      if(this.newProducto){

        this._productosService.createProducto(this.producto).subscribe(resp=>{
          console.log("done!!!")

        },error=>{
            this.getProductos();
            this.msgs =  this._mensajesService.showSuccess("se creó el producto");

        });

      }else{

        this._productosService.updateProducto(this.producto).subscribe(resp=>{

        },error=>{

        },()=>{
          this.getProductos();
          this.msgs = this._mensajesService.showInfo("Se editó el producto");
        });
      }

    }

    deleteProducto(producto:any){
        this._productosService.deleteProducto(producto).subscribe(resp=>{

        },error=>{
           this.getProductos();
           this.msgs = this._mensajesService.showInfo("Se borró el producto");
        },()=>{

        });
    }

}

export class Producto  {

    constructor(public nombre?, public valor?, public cantidad_total?, public cantidad_disponible?) {}
}

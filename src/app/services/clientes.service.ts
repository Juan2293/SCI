import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ClientesService {

  clientes:any[]=[];
  cliente:any;
  url:string = "http://192.168.0.12:8080/user/";

  constructor(private http:HttpClient) {

  }

  getClientes(){

    return this.http.get(this.url+"clientes").map( (resp:any)=>{
      this.clientes = resp;
      return this.clientes;
    });
  }

  getClientesById(clienteId){
    return this.http.get(this.url+"cliente/"+clienteId).map( (resp:any)=>{
      this.cliente = resp;
      return this.cliente;
    });
  }



createCliente(cliente:any){

      return  this.http.post(this.url+"cliente",cliente)
            .map(
              (success:any) => {
                console.log("funciono create  ");
                console.log(success.status);

              },
              err => {
                console.log("Error occured create");
              }
            );

      }
  updateCliente(cliente: any) {

      return this.http.put(this.url+"cliente", cliente)
          .map(
               (success:any) => {
                 //entra aqui
                },
               err =>{
                 //aqui no entra
                    console.log("Error occured update");
               }
             );
    }

    deleteCliente(cliente: any) {

        return this.http.delete(this.url+"cliente/"+cliente.clienteId  )
            .map(
                 (success:any) => {
                   console.log("sucess delete")
                  },
                 err =>{
                      console.log("Error occured delete");
                 }
               );
      }


}


export interface Cliente{

 nombre: string;
 apellido: string;
 direccion:string;
 telefono:string;
 telefono_fijo:string;
 correo:string;

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ClientesService {

  clientes:any[]=[];
  ip_servicios:string = "192.168.0.12";
  constructor(private http:HttpClient) {

  }

  getClientes(){

    let url = "http://"+this.ip_servicios+":8080/user/clientes";


    return this.http.get(url).map( (resp:any)=>{
      this.clientes = resp;
      return this.clientes;
    });

  }


createCliente(cliente:any){



      return  this.http.post('http://'+this.ip_servicios+':8080/user/cliente',cliente)
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

      return this.http.put('http://'+this.ip_servicios+':8080/user/cliente', cliente)
          .map(
               (success:any) => {
                   console.log(success.status)
                },
               err =>{
                    console.log("Error occured update");
               }
             );
    }

    deleteCliente(cliente: any) {


        return this.http.delete('http://'+this.ip_servicios+':8080/user/cliente/'+cliente.clienteId  )
            .map(
                 (success:any) => {
                   console.log("sucess delete")
                     console.log(success.status)
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

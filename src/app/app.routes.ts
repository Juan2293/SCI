import { RouterModule, Routes } from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import {PedidosComponent} from './components/pedidos/pedidos.component';
import {PedidoComponent} from './components/pedido/pedido.component';
import {HomeComponent} from './components/home/home.component';
import {ProductosComponent} from './components/productos/productos.component';
import { BuscarComponent } from './components/buscar/buscar.component';


const APP_ROUTES: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'pedidos/:nombreCliente/:clienteId', component: PedidosComponent },
  {path: 'resultado/:termino', component: BuscarComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
  // **  redirecciona al home cuando es link no es valido

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});

import { RouterModule, Routes } from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import {PedidosComponent} from './components/pedidos/pedidos.component';
import {PedidoComponent} from './components/pedido/pedido.component';
const APP_ROUTES: Routes = [


  { path: 'clientes', component: ClientesComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' }
  //** cualquier cosa me redirecciona al home

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});

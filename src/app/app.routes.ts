import { RouterModule, Routes } from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import {PedidosComponent} from './components/pedidos/pedidos.component';
import {PedidoComponent} from './components/pedido/pedido.component';
import {HomeComponent} from './components/home/home.component';
import {ProductosComponent} from './components/productos/productos.component';
const APP_ROUTES: Routes = [


  { path: 'clientes', component: ClientesComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
  //** cualquier cosa me redirecciona al home

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});

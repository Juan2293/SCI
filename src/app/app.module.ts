//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';

//primeng
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

//componentes
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';


//servicios
import {ClientesService} from './services/clientes.service';
import {PedidosService} from './services/pedidos.service';
import {ProductosService} from './services/productos.service';
import {MensajesService} from "./services/mensajes.service";
//rutas
import { APP_ROUTING } from './app.routes';

//pipes

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    NavbarComponent,
    PedidosComponent,
    PedidoComponent,
    HomeComponent,
    ProductosComponent

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    ScheduleModule

  ],
  providers: [
    ClientesService,
    ConfirmationService,
    PedidosService,
    ProductosService,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

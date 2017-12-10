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
//componentes
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
//servicios
import {ClientesService} from './services/clientes.service';

//rutas
import { APP_ROUTING } from './app.routes';
import { PedidoComponent } from './components/pedido/pedido.component';

//pipes

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    NavbarComponent,
    PedidosComponent,
    PedidoComponent,

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
    DropdownModule

  ],
  providers: [ClientesService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

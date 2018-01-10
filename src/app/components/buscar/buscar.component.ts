import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  termino: string;
  clientes: any[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private clienteService: ClientesService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.termino = params['termino'];

      // this.clientes = this.clienteService.buscarHeroes(params['termino']);
      // if (this.heroes.length === 0) {

      //   this.router.navigate([ '/vacio', this.termino ]);
      // }
  });  // fin metodo
  }

}

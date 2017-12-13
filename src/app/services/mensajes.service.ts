import { Injectable } from '@angular/core';
import {Message} from 'primeng/components/common/api';
@Injectable()
export class MensajesService {
  
   msgs:Message[] =[];

  constructor() { }

  showSuccess(mesaneje:string) {
      this.msgs = [];
      this.msgs.push({severity:'success', summary:"DONE", detail:mesaneje});
      return this.msgs;
  }

  showError(mensaje:string) {
       this.msgs = [];
       this.msgs.push({severity:'error', summary:"ERROR", detail:mensaje});
       return this.msgs;
   }

   showInfo(mensaje:string) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:"INFO", detail:mensaje});
        return this.msgs;
    }


}

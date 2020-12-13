import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  
  constructor( public deseosService:DeseosService,
               private router:Router, private alertController:AlertController ) {
    
  }

  /**
   * agregarList
   */
  public async agregarList() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New List',
      inputs:[
        {
          name:'title',
          type:'text',
          placeholder:'Lista name'
        }
      ],
      buttons: [
        {
          text:'Cancel',
          role:'cancel',
          handler: () => {
            console.log('Cancelar');
            
          }
        },
        {
          text:'Create',
          handler: ( data ) => {
            console.log(data); 
            const id = this.deseosService.createList(data.title)
            if (id) {
              this.router.navigateByUrl(`tabs/tab1/agregar/${id}`)
              
            }
            
          }
        }
      ]
    });

    alert.present();
  }

  
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { List } from '../../models/list.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList ) ionList: IonList
  @Input() complete: boolean = false

  constructor( public deseosService:DeseosService, 
    private router:Router, 
    private alertController:AlertController ) { }

  ngOnInit() {}

  getListById( list:List ){
    if (this.complete) {

      this.router.navigateByUrl(`tabs/tab2/agregar/${list.id}`)
      
      
    }else{
      
      this.router.navigateByUrl(`tabs/tab1/agregar/${list.id}`)

    }

  }

  deleteItem( list:List  ){
    this.deseosService.deleteList(list)
  }

  async editNameList( list:List ) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar List',
      inputs:[
        {
          name:'title',
          type:'text',
          value: list.title,
          placeholder:'Lista name'
        }
      ],
      buttons: [
        {
          text:'Cancel',
          role:'cancel',
          handler: () => {
            this.ionList.closeSlidingItems()
          }
        },
        {
          text:'Edit',
          handler: ( data:{title:string} ) => {

            if (data.title.length === 0){
              return
            }
            
            list.title = data.title
            this.deseosService.setStorage()
            this.ionList.closeSlidingItems()

          }
        }
      ]
    });

    alert.present();
  }


}

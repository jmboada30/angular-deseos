import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-items.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  list: List
  nameItem: string

  constructor( private deseosService:DeseosService, private route:ActivatedRoute ) {

    const listId = this.route.snapshot.paramMap.get('id')
    console.log(listId);
    this.list = this.deseosService.getListById(listId)
    
   }

  ngOnInit() {
  }

  /**
   * addItem
   */
  public addItem() {
    if (this.nameItem.length === 0) {
      return
    }

    const newItem = new ListItem( this.nameItem )
    this.list.items.push( newItem )

    this.nameItem = ''
    this.deseosService.setStorage()
  }

  /**
   * changeCheck  */
  public changeCheck( item:ListItem ) {
    console.log(item);

    const missing = this.list.items.filter ( itemData => !itemData.done ).length

    if (missing === 0 ) {
      this.list.doneAt = new Date()
      this.list.done = true
    }else{
      this.list.doneAt = null
      this.list.done = false

    }

    this.deseosService.setStorage()
    
  }

  deleteItem( i:number ){

    this.list.items.splice( i, 1 )

    this.deseosService.setStorage()
  }
}

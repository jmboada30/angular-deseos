import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  lists:List[] = []

  constructor() { 
    
    this.getStorage()
    
    
  }

  public createList(title:string) {
    if (title.length === 0) {
    return
    }else{
    const newList = new List(title)
    this.lists.push(newList)
    this.setStorage()
    return newList.id
    }
  }

  /**
   * deleteList
   */
  public deleteList( list:List ) {
    // podemos borrar un item filtrando y dejando sola las que no coincidan con el filtro
    // luego lo set en el localstorage
    this.lists = this.lists.filter( listData => listData.id !== list.id )
    this.setStorage()
    
  }

  /**
   * getListById
   */
  public getListById(id:number|string) {
    id = Number(id)

    return this.lists.find( listData => listData.id == id )
  }

  // para depositar info en localstorage
  public setStorage() {
    localStorage.setItem('data', JSON.stringify(this.lists))
  
  }
  
  // para traer info del localstorage
  public getStorage() {
    
    if (localStorage.getItem('data')) {
      this.lists = JSON.parse( localStorage.getItem('data') )
    }
  }
  
}

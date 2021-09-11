import { Component, Input, Output } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Iform } from './object.interface';
import { ModalController } from '@ionic/angular';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  @Output() public out: any
  @Input() public inpu: any
  arr: any [] = []
  public form: Iform;
  
  public obj:any =  {
    id: 1,
    "name":  '',
    "description": "",
    date: ''
  }
  public disab: boolean = true
  
  constructor(
    private modalCtrl: ModalController,
    private service: AppService
  ) {
    
  }

  async get(){
    const { value } = await Storage.get({ key: 'tarefa' });
    console.log(value);
    
   let a = JSON.parse(value);
    console.log(a);
  }
   ngOnInit() {

  }


  change(event){
    if(event.detail.value.length > 0 && event.target.name === 'fucus'){
      this.disab = false
    }else{
      this.disab = true
    }
  }
  
 async save(){
  this.disab = true

 let key = await Storage.keys().then(keys => { 
   return keys.keys
 })
  
  /**
   * Verifica se a propriedade existe
   * Caso exista, converte de String para Object
   */
  if (key.find( res => res == 'tarefa')) {
    const { value } = await Storage.get({ key: 'tarefa' });
    value.length[value.length -1]
    
    this.arr = JSON.parse(value);
    
      }


  this.arr.push(this.obj);
   
  if(this.arr.length > 1){
    let maior = 0;

    for(let i = 0; i < this.arr.length; i++){

      if(this.arr[i].id > maior){

        maior = this.arr[i].id;
      }

    }
    
    this.arr[this.arr.length-1].id = maior + 1;
  }
  await Storage.set({
    key: 'tarefa',
    value: JSON.stringify(this.arr.reverse()),
  });
  
  this.service.addData(true)
  this.modalCtrl.dismiss()  

  }
  

}

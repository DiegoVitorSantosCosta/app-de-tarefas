import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public data: any
  
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    
  console.log(this.data);

  }
  close(){
    this.modalCtrl.dismiss();
    
  }

 async save(){
    console.log(this.data);
   let data = await Storage.get({key: 'tarefa'})
   
    let jsonData: any[] = JSON.parse(data.value)

    let index = jsonData.findIndex(item => item.id === this.data.id)
    jsonData[index] = this.data
    

    console.log(jsonData);
    
 
      
      Storage.set({
        key: 'tarefa',
        value: JSON.stringify(jsonData)
        
      })
      this.modalCtrl.dismiss();
}
}
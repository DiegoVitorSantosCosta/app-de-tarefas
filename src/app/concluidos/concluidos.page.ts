import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { Storage } from '@capacitor/storage';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-concluidos',
  templateUrl: './concluidos.page.html',
  styleUrls: ['./concluidos.page.scss'],
})
export class ConcluidosPage implements OnInit {

  public booll: boolean = false;
  public done: any;
  
  constructor(
    private toastController: ToastController,
    private service  : AppService,
    public navCtrl: NavController
    
  ) {  
    
    AppService.paraAtualizarOdone.subscribe(res => {
      console.log(res);
      
      this.booll = res
      
      if(this.booll){
        this.get();
        console.log('lkjlkj');
        
        this.booll = false
      }

    })
    

}

  public data: any
  public filterTerm: string;

  async get(){
    const { value } = await Storage.get({ key: 'tarefasConcluidas' });
    console.log(value);
    
    if(value != null){
      this.data = JSON.parse(value)
  
      this.service.addIten(this.data.length);

    }
    
  }

  back(){
    this.navCtrl.back();

  }

  async toast(message,button){
    const toast = await this.toastController.create({
      message: message,
      color: 'success',
      duration: 3000,
      buttons: [{
        text: button,
        handler: () => {
          toast.present()
        }
      }]
    })
    toast.present();
  }

  async delete(event: any){

    this.toast('Tarefa excluida com sucesso','Ok');

    let index = this.data.findIndex( index => index.id === event.id);
  
  //  let teste =  await Storage.remove({  });
  Storage.get({ key: 'tarefaConcluidas' }).then(async (response) => {
  
    console.log(response);
    
    let a = JSON.parse(response.value);
  
    
    this.data.splice(index, 1);
    await Storage.set({ key: 'tarefasConcluidas', value: JSON.stringify(this.data) });

    this.service.adcionarNOconcluido(true)
    
  }).catch(err => console.log(err));
  
    
  }
  

  async Noconclud(event,item){

    this.toast('Tarefa marcada como não concluída','Ok')
    let index = this.data.findIndex( index => index.id === item.id);
    
    const { value } = await Storage.get({ key: 'tarefa' });

    let arr = []

    arr = JSON.parse(value);

    arr.push(this.data[index]);

    console.log(arr);
    
    
    this.data.splice(index, 1);
    await Storage.set({ key: 'tarefasConcluidas', value: JSON.stringify(this.data)});
    await Storage.set({ key: 'tarefa', value: JSON.stringify(arr) });
    // let response = await Storage.get({ key:'tarefa' });
    this.service.addData(true)
  }
  ngOnInit() {
    this.get();
    console.log('lkjlkj');
    
  }

}

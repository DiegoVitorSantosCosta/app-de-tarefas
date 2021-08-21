import { Component, Input, Output, ViewChild } from '@angular/core';
import { ActionSheetController, IonReorderGroup, IonSlides , ModalController, ToastController } from '@ionic/angular';

import { Storage } from '@capacitor/storage';

import { ItemReorderEventDetail } from '@ionic/core';
import { ModalPage } from '../components/modal/modal.page';

import { SplashScreen } from '@capacitor/splash-screen';
import { Tab2Page } from '../tab2/tab2.page';
import { AppService } from '../services/app.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public segment: number = 0
  public dates: any;
  public length: number   
  public done: number = 0;
  public event: ItemReorderEventDetail
  public bool = false
  public filterTerm: string;
  public numberOfStorage: number;
  public data: boolean
  public tarefasConcluidas: any[] = [];

  sliderOptions={
    initialSlide: 0,
    speed: 0,
    slidePerView: 1,
    

  }
  public selectSlide: any;
  @Input() item: any

  @ViewChild(IonContent) content: IonContent;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(
    private toastController: ToastController,
    private service: AppService,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    
  ) {
   
    AppService.event.subscribe(res => {
      this.data = res
      if(this.data){
        
           this.get();
           this.data = false
         }
        this.lengthDone()
           
    })

    
    
      
  }
  

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
 
  async segmentChanged(event){
   
    
    await this.selectSlide.slideTo(this.segment);
  }

 async slideShanged(slides:IonSlides){
    
  console.log(slides);
  
    this.selectSlide = slides
    slides.getActiveIndex().then(selectIndex =>{
     
      
      // this.content.scrollToTop(0)
      this.segment = selectIndex
    })
   
  }

  async refres(){
    const { value } = await Storage.get({ key: 'tarefa' });
    let length = JSON.parse(value)?.length;
    if(this.length < length){
      this.get();
      console.log('e menor');
      
    } 
  }
  async get(){
    const { value } = await Storage.get({ key: 'tarefa' });
    console.log(value);
    this.length = JSON.parse(value)?.length;
    console.log(this.length);
    
    // let response = await Storage.get({ key:'tarefa' });
    this.dates = JSON.parse(value)
    // console.log(this.dates);
    
  }


  async lengthDone(){
    let {value} = await Storage.get({ key: 'tarefasConcluidas' })
   
  return this.done = JSON.parse(value)?.length;
  }
 async ngOnInit() {
   
   
   this.lengthDone()

  this.refres()
   this.get()
   
   
   
 }
  async modalCreate(){
   let modal =  await this.modalCtrl.create({
     component: Tab2Page,
     cssClass: 'my-custom-modal-css',
     componentProps: {
       bool: false}

    })
    modal.onDidDismiss()
    .then(res =>{
      console.log(res);

      
      
    })
   return await modal.present();
 }

 
 async presentModal(item: any) {
  const modal = await this.modalCtrl.create({
    component: ModalPage,
    componentProps: { 
      data: item
    }

    
      
  });
  
  return await modal.present();
}
  public count : number = 0;

  async tapEvent(event: any){
  this.count++;
  
}
showSplashScreen() {
  alert('lskdfj')
  SplashScreen.show({

    autoHide: true,
    showDuration: 2000,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    
    
  });
}
 doRefresh(event) {
   
   setTimeout(() => {
     this.get();
     event.target.complete();
  }, 700);
}
doReorder(ev: CustomEvent<ItemReorderEventDetail>) {

  ev.detail.complete();

  this.dates = this.changePosition(this.dates, ev.detail.from, ev.detail.to);

  Storage.set({ key: 'tarefa', value: JSON.stringify(this.dates) });
}
changePosition(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
};
toggleReorderGroup() {
  this.reorderGroup.disabled = !this.reorderGroup.disabled;
}
async delete(event: any){

  const toast = await this.toastController.create({
    message: 'Tarefa deletada com sucesso',
    duration: 2000,
    color: 'success',
    buttons:[{
      text: 'Ok',
      handler: () => {
        toast.present();
      }
    }]
  });
  toast.present();

  let index = this.dates.findIndex( index => index.id === event.id);

//  let teste =  await Storage.remove({  });
Storage.get({ key: 'tarefa' }).then(async (response) => {

  let value = JSON.parse(response.value);

  
  
  this.dates.splice(index, 1);
  await Storage.set({ key: 'tarefa', value: JSON.stringify(this.dates) });
}).catch(err => console.log(err));

  this.length --;
}
async conclud(event,item){

  const toast = await this.toastController.create({
    message: 'Tarefa concluída',
    duration: 2000,
    color: 'success',
    buttons:[{
      text: 'Desfazer',
      handler: () => {
        this.Noconclud(item);
      }
    }]
  });

  toast.present();
  
  this.tarefasConcluidas.push(item)
  console.log(this.tarefasConcluidas);
  
  const { value }  = await Storage.get({ key: 'tarefasConcluidas'})
  let lengthDone
  
  if(value){

    this.tarefasConcluidas =   JSON.parse(value)
    this.tarefasConcluidas.push(item)
    lengthDone = this.tarefasConcluidas.length
  }


  
  Storage.set({ key: 'tarefasConcluidas', value: JSON.stringify(this.tarefasConcluidas) })
  
  this.service.adcionarNOconcluido(true)

  this.removeItem(this.dates,item)
  this.length --;
  this.done = lengthDone;

  this.service

  let a = event.srcElement.parentElement.parentElement
 
    
    
  }

  removeItem(tarefas: any,tarefaConcluida){

    let index = tarefas.findIndex(item => item.id === tarefaConcluida.id)
    this.dates.splice(index, 1);
    Storage.set({ key: 'tarefa', value: JSON.stringify(this.dates) });
  }

  async Noconclud(item){
    let index = this.tarefasConcluidas.findIndex( index => index.id === item.id);
    console.log(index);
    
    const { value } = await Storage.get({ key: 'tarefa' });

    let arr = []

    arr = JSON.parse(value);

    arr.push(this.tarefasConcluidas[index]);

    console.log(arr);
    
    
    this.tarefasConcluidas.splice(index, 1);
    await Storage.set({ key: 'tarefasConcluidas', value: JSON.stringify(this.tarefasConcluidas)});
    await Storage.set({ key: 'tarefa', value: JSON.stringify(arr) });
    // let response = await Storage.get({ key:'tarefa' });
    this.service.addData(true)
  }

}


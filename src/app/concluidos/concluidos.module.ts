import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcluidosPageRoutingModule } from './concluidos-routing.module';

import { ConcluidosPage } from './concluidos.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcluidosPageRoutingModule,
    Ng2SearchPipeModule,

  ],
  declarations: [ConcluidosPage, ExploreContainerComponent]
})
export class ConcluidosPageModule {}

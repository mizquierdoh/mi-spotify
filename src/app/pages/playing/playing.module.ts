import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayingPageRoutingModule } from './playing-routing.module';

import { PlayingPage } from './playing.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayingPageRoutingModule,
    PipesModule
  ],
  declarations: [PlayingPage]
})
export class PlayingPageModule { }

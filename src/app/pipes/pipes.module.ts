import { NgModule } from '@angular/core';
import { SongTimePipe } from './song-time.pipe';

@NgModule({
  declarations: [SongTimePipe],
  imports: [],
  exports: [SongTimePipe]
})
export class PipesModule { }

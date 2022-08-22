import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songTime'
})
export class SongTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const totalSeconds = Math.floor(value / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    let result = (hours > 0 ? (hours + ":") : "") + minutes + ":" + seconds.toLocaleString('es-ES', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    return result;
  }

}

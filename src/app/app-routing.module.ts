import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module').then(m => m.LibraryPageModule)
  },
  {
    path: 'playing',
    loadChildren: () => import('./pages/playing/playing.module').then(m => m.PlayingPageModule)
  },
  {
    path: 'albums',
    loadChildren: () => import('./pages/albums/albums.module').then(m => m.AlbumsPageModule)
  },
  {
    path: 'albums/:idArtist',
    loadChildren: () => import('./pages/albums/albums.module').then(m => m.AlbumsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

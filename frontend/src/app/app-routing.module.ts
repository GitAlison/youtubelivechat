import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'video/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'video/:id',
    loadChildren: () =>
      import('./pages/video/video.page.module').then((m) => m.VideoPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
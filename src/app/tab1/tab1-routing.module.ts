import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
//import { CardPage} from './card.page'

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'card',
    loadChildren: './card.module'
  },
  {
    path: 'add',
    loadChildren: './add-product.module'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}

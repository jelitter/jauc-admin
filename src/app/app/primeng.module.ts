import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';

const PrimeNgModules = [
  ButtonModule,
  DialogModule,
  MenuModule,
  PanelModule,
  SlideMenuModule,
  SplitButtonModule,
  TabMenuModule,
  ToolbarModule
];

@NgModule({
  imports: PrimeNgModules,
  exports: PrimeNgModules
})
export class PrimeNgModule {}

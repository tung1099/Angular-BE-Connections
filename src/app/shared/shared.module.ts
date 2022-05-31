import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {FormsModule} from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [NavBarComponent, SideBarComponent, FooterComponent],
    exports: [
        NavBarComponent,
        FooterComponent,
        SideBarComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        FormsModule
    ]
})
export class SharedModule { }

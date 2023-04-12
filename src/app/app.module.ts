import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { LayoutModule } from "./layout/layout.module";
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SharedModule,
    LayoutModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

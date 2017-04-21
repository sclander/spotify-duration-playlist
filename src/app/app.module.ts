import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { ResultsComponent } from './results/results.component';
import { ContainerComponent } from './container/container.component';
import { SpotifyService } from './spotify.service';

const routes = [{
  path: '**', 
  component: ContainerComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    ResultsComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

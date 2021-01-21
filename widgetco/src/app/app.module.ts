import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './scoreboard/scoreboard.component';
import { IndividualContributorComponent } from './individual-contributor/individual-contributor.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    IndividualContributorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

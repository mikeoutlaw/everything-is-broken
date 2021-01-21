import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreBoardComponent } from './scoreboard/scoreboard.component';
import { IndividualContributorsComponent } from './individual-contributors/individual-contributors.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreBoardComponent,
    IndividualContributorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreBoardComponent } from './scoreboard/scoreboard.component';
import { IndividualContributorsComponent } from './individual-contributors/individual-contributors.component';
import { SmallTeamsComponent } from './small-teams/small-teams.component';
import { MediumTeamComponent } from './medium-team/medium-team.component';
import { LargeTeamComponent } from './large-team/large-team.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreBoardComponent,
    IndividualContributorsComponent,
    SmallTeamsComponent,
    MediumTeamComponent,
    LargeTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

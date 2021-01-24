import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreBoardComponent } from './scoreboard/scoreboard.component';
import { IndividualContributorsComponent } from './individual-contributors/individual-contributors.component';
import { SmallTeamsComponent } from './small-teams/small-teams.component';
import { MediumTeamComponent } from './medium-team/medium-team.component';
import { LargeTeamComponent } from './large-team/large-team.component';
import { HiringManagersComponent } from './hiring-managers/hiring-managers.component';
import { HrDeptComponent } from './hr-dept/hr-dept.component';
import { HrTeamComponent } from './hr-team/hr-team.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreBoardComponent,
    IndividualContributorsComponent,
    SmallTeamsComponent,
    MediumTeamComponent,
    LargeTeamComponent,
    HiringManagersComponent,
    HrDeptComponent,
    HrTeamComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

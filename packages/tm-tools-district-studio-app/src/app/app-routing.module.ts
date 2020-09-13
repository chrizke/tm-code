import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './sections/members/members.component';
import { SettingsComponent } from './sections/settings/settings.component';
import { ClubsComponent } from './sections/clubs/clubs.component';

const routes: Routes = [
  { path: 'members', component: MembersComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/members', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfomosqueComponent } from './trouvermosqueetunisie/infomosque/infomosque.component';
import { MacqueliveComponent } from './macquelive/macquelive.component';
import { TempspriereComponent } from './tempspriere/tempspriere.component';
import { TrouvermosqueeComponent } from './trouvermosquee/trouvermosquee.component';
import { TrouvermosqueetunisieComponent } from './trouvermosqueetunisie/trouvermosqueetunisie.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FullscreenmosqueComponent } from './fullscreenmosque/fullscreenmosque.component';
import { QuranecritComponent } from './quranecrit/quranecrit.component'
import { RevendiquermosqueComponent } from './revendiquermosque/revendiquermosque.component';
import { RecitateursComponent } from './recitateurs/recitateurs.component';
import { ConditiongeneraleComponent } from './conditiongenerale/conditiongenerale.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'macquelive', component: MacqueliveComponent},
  {path: 'touvermosquee', component: TrouvermosqueeComponent},
  {path: 'touvermosqueetunisie', component: TrouvermosqueetunisieComponent},
  {path: 'tempspriere', component: TempspriereComponent},
  {path: 'infomosque/:idm', component: InfomosqueComponent},
  {path: 'fullscreenmosque/:idm', component: FullscreenmosqueComponent},
  {path: 'quranecrit', component: QuranecritComponent},
  {path: 'revendiquermosque/:idm', component: RevendiquermosqueComponent},
  {path: 'recitations', component: RecitateursComponent},
  {path: 'conditionsgenerales', component: ConditiongeneraleComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
  {path: 'userProfile', component: ProfileComponent,canActivate:[AuthGuard]},
 /* {path: 'listUsers', component: ListUsersComponent },
  {path: 'add', component: AddComponent},
  {path: '**',component: HomepageComponent},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

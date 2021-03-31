import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './nav/header/header.component';
import { FooterComponent } from './nav/footer/footer.component';
import { MacqueliveComponent } from './macquelive/macquelive.component';
import { TrouvermosqueeComponent } from './trouvermosquee/trouvermosquee.component';
import { ApiserviceService } from './shared/apiservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TrouvermosqueetunisieComponent } from './trouvermosqueetunisie/trouvermosqueetunisie.component';
import { InfomosqueComponent } from './trouvermosqueetunisie/infomosque/infomosque.component';
import { TempspriereComponent } from './tempspriere/tempspriere.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FullscreenmosqueComponent } from './fullscreenmosque/fullscreenmosque.component';
import { QuranecritComponent } from './quranecrit/quranecrit.component';
import { ConditiongeneraleComponent } from './conditiongenerale/conditiongenerale.component';
import { RevendiquermosqueComponent } from './revendiquermosque/revendiquermosque.component';
import { RecitateursComponent } from './recitateurs/recitateurs.component';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { LeafletMarkerClusterModule } from "@asymmetrik/ngx-leaflet-markercluster";
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { NgxCircularPlayerModule } from 'ngx-circular-player';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { AddComponent } from './add/add.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LocationStrategy } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MacqueliveComponent,
    TrouvermosqueeComponent,
    TrouvermosqueetunisieComponent,
    InfomosqueComponent,
    TempspriereComponent,
    HomepageComponent,
    FullscreenmosqueComponent,
    QuranecritComponent,
    ConditiongeneraleComponent,
    RevendiquermosqueComponent,
    RecitateursComponent,
    AboutUsComponent,
    AddComponent,
    ListUsersComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    NgxAudioPlayerModule,
    InternationalPhoneNumberModule,
    NgxCircularPlayerModule,
    CarouselModule,
    WavesModule,
    FilterPipeModule

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    ApiserviceService,{ provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,}, AuthGuard, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
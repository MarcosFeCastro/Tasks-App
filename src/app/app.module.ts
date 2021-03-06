import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePageModule } from './home/home.module';

import { StorageService } from './services/storage.service';
import { HttpsRequestInterceptorProvider } from './interceptors/https-request-interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    
    HomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    StorageService,
    HttpsRequestInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

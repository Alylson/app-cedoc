import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { NavPage } from "../pages/nav/nav";
import { HomePage } from "../pages/home/home";
import { BooksPage } from "../pages/books/books";
import { FavoritesPage } from "../pages/favorites/favorites";
import { ProfilePage } from "../pages/profile/profile";
import { ConfigProvider } from '../providers/config/config';
import { ApiProvider } from '../providers/api/api';
import { UtilsProvider } from '../providers/utils/utils';
import { LoginPage } from "../pages/login/login";

@NgModule({
  declarations: [
    MyApp,
    NavPage,
    HomePage,
    BooksPage,
    FavoritesPage,
    ProfilePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NavPage,
    HomePage,
    BooksPage,
    FavoritesPage,
    ProfilePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    ApiProvider,
    UtilsProvider
  ]
})
export class AppModule {}

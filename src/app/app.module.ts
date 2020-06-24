import { NgModule } from '@angular/core';



import { RouterModule,Routes } from '@angular/router';//rutas dinamnicas
import { ReactiveFormsModule } from '@angular/forms'; //formularios reactivos
import { HttpClientModule } from '@angular/common/http'; //para llamar al backend mediante http : signin servicev

//servicios
import { SignInService } from './services/signin.service';// servicio para loguearnos
import { SesionService } from './services/sesion.service';//servivio para saber que usuario esta online

//componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CrearConvocatoriaComponent } from './components/crear-convocatoria/crear-convocatoria.component';
import { ConsultarConvocatoriaComponent } from './components/consultar-convocatoria/consultar-convocatoria.component';


//utilitarios
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



//import { from } from 'rxjs';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent}, //InicioComponent
  { path: 'login', component: LoginComponent},
  { path: 'nosotros', component: NosotrosComponent}, //NosotrosComponent
  { path: 'sidenav', component: SidenavComponent},
  { path: 'crearConvocatoria', component: CrearConvocatoriaComponent},
  { path: 'consultarConvocatoria', component: ConsultarConvocatoriaComponent},
  { path: '', component: InicioComponent, pathMatch:'full'},
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    SidenavComponent,
    CrearConvocatoriaComponent,
    ConsultarConvocatoriaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule, //formularios reactivos
    HttpClientModule, //para llamar al backend mediante http : signin service
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [SignInService,SesionService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

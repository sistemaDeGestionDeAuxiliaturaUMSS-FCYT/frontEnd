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
import { CrearConvocatoriaComponent } from './components/crear-convocatoria/crear-convocatoria.component';
import { ConsultarConvocatoriaComponent } from './components/consultar-convocatoria/consultar-convocatoria.component';
import { ConfigurarConvocatoriaComponent } from './components/configurar-convocatoria/configurar-convocatoria/configurar-convocatoria.component';
import { RequerimientosComponent } from './components/configurar-convocatoria/requerimientos/requerimientos.component';
import { RequisitosComponent } from './components/configurar-convocatoria/requisitos/requisitos.component';
import { DocumentosAPresentarComponent } from './components/configurar-convocatoria/documentos-a-presentar/documentos-a-presentar.component';
import { CalificacionDeMeritosComponent } from './components/configurar-convocatoria/calificacion-de-meritos/calificacion-de-meritos.component';
import { CalificacionDeConocimientosComponent } from './components/configurar-convocatoria/calificacion-de-conocimientos/calificacion-de-conocimientos.component';
import { EventosComponent } from './components/configurar-convocatoria/eventos/eventos.component';
import { DatosRotuloComponent } from './components/configurar-convocatoria/datos-rotulo/datos-rotulo.component';
import { ModificarDatoRotuloComponent } from './components/configurar-convocatoria/modificar-dato-rotulo/modificar-dato-rotulo.component';
import { AniadirDatoRotuloComponent } from './components/configurar-convocatoria/aniadir-dato-rotulo/aniadir-dato-rotulo.component';


//utilitarios
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RotuloItemConvocatoriaComponent } from './components/configurar-convocatoria/rotulo-item-convocatoria/rotulo-item-convocatoria.component';




const routes: Routes = [
  { path: 'inicio', component: InicioComponent}, //InicioComponent
  { path: 'login', component: LoginComponent},
  { path: 'nosotros', component: NosotrosComponent}, //NosotrosComponent
  { path: 'configurarConvocatoria', component: ConfigurarConvocatoriaComponent},
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
    CrearConvocatoriaComponent,
    ConsultarConvocatoriaComponent,
    ConfigurarConvocatoriaComponent,
    RequerimientosComponent,
    RequisitosComponent,
    DocumentosAPresentarComponent,
    CalificacionDeMeritosComponent,
    CalificacionDeConocimientosComponent,
    EventosComponent,
    DatosRotuloComponent,
    ModificarDatoRotuloComponent,
    AniadirDatoRotuloComponent,
    RotuloItemConvocatoriaComponent
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

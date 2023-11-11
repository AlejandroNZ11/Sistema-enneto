import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';

const routes: Routes = [
  { path: '', component: PatientComponent,
  children: [
    {
      path: 'registro',
      loadChildren: () =>
        import('./patients-list/patients-list.module').then(
          (m) => m.PatientsListModule
        ),
    },
    {
      path: 'historia-general',
      loadChildren: () =>
        import('./historia-general/historia-general.module').then(
          (m) => m.HistoriaGeneralModule
        ),
    },
    {
      path: 'historia-medico',
      loadChildren: () =>
        import('./historia-medico/historia-medico.module').then(
          (m) => m.HistoriaMedicoModule
        ),
    },
    {
      path: 'patient-profile',
      loadChildren: () =>
        import('./patient-profile/patient-profile.module').then(
          (m) => m.PatientProfileModule
        ),
    },
    {
      path: 'patient-setting',
      loadChildren: () =>
        import('./patient-setting/patient-setting.module').then(
          (m) => m.PatientSettingModule
        ),
    },
    {
      path: 'historia-paciente',
      loadChildren: () =>
        import('./historia-paciente/historia-paciente.module').then(
          (m) => m.HistoriaPacienteModule
        ),
    },
    {
      path: 'agregar-paciente',
      loadChildren: () =>
        import('./add-patient/add-patient.module').then(
          (m) => m.AddPatientModule
        ),
    },
    {
      path: 'editar-paciente',
      loadChildren: () =>
        import('./edit-patient/edit-patient.module').then(
          (m) => m.EditPatientModule
        ),
    },
  ]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}

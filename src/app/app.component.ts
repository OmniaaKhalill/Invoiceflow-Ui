import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';
import { mainLayoutComponent } from './layouts/main-layout/lantana-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideNavComponent,mainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Invoiceflow-Ui';
}

// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   protected readonly title = signal('con-joc-app');
// }


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { ButtonComponent ,TableColumn,TableComponent, TableConfig} from '@eh-library/common';
// import { BehaviorSubject } from 'rxjs';



// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ButtonComponent,TableComponent],   
//   template: `
//     <eh-button
//       [label]="'Add New Ratedeck'"
//       (click)="onAddOutboundRate()"
//       class="add-btn">
//     </eh-button>

//        <eh-table
//       [columns]="clusterColumns"
//       [config]="config"
//       [dataSource$]="clusterDataSource$"
//        [tableTitle]="'Show Trunks'"
//       >
//     </eh-table>
//   `
// })
// export class App {
//   constructor(private router:Router){}

//   onAddOutboundRate() {
//     console.log('Button clicked!');
//     this.router.navigate(['/omni']);
//   }
//     private clusterSubject = new BehaviorSubject<any[]>([]);
// readonly clusterDataSource$ = this.clusterSubject.asObservable();

//    clusterColumns :TableColumn[]= [
//   { key: 'ip', label: 'IP Address', sortable: true },
//   { key: 'mask', label: 'Mask', sortable: true },
//   { key: 'port', label: 'Port', sortable: true },
// ];

// config: TableConfig = {
//     showSearch: false,
//     showExport: false,
//     showPagination: false,
//     serverSide: false,
//     loading: false,
//     usePagination:false,
//   };


// }

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, RouterOutlet],
  template: `
 

    <router-outlet></router-outlet>
  `
})
export class App {
  constructor(private router: Router) {}

  onAddOutboundRate() {
    console.log('Button clicked!');
    this.router.navigate(['/omni']); 
  }
}


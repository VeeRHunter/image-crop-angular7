import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';



@Component({
  selector: 'app-company-admin-update',
  templateUrl: './company-admin-update.component.html',
  styleUrls: ['./company-admin-update.component.css'],
  animations: [
    trigger('imganimate', [
      transition('* => *', [
        query('img', style({ opacity: 0 })),

        query('img', stagger('60ms', [
          animate('600ms 1.3s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),

    trigger('page', [
      transition('* => *', [
        query('.page-content', style({ opacity: 0 })),

        query('.page-content', stagger('30ms', [
          animate('600ms 1.7s ease-out', style({ opacity: 1 }))
        ]))
      ])
    ]),


  ]
})
export class CompanyAdminUpdateComponent implements OnInit {

  selectedID;
  constructor(route: ActivatedRoute) {
    this.selectedID = route.snapshot.params['memberID'];
  }


  ngOnInit() {
  }

}

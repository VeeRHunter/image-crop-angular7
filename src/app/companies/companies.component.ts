import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
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
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

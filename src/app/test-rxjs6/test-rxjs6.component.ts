import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { bufferCount } from 'rxjs/operators';
import { concat, delay, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-test-rxjs6',
  templateUrl: './test-rxjs6.component.html',
  styleUrls: ['./test-rxjs6.component.css']
})
export class TestRxjs6Component implements OnInit {
  private result;
  constructor() {

    // emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
    const source = from([
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 20 },
      { name: 'Ryan', age: 50 }
    ]);
    // grab each persons name, could also use pluck for this scenario
    const example = source.pipe(map(({ name }) => name));
    // output: "Joe","Frank","Ryan"
    const subscribe = example.subscribe(val => console.log(val));
    this.result = subscribe;

  }

  // 65849973	06/10/2018	71017473376706<=>NC8Y18RCD10319138

  ngOnInit() {
  }

}

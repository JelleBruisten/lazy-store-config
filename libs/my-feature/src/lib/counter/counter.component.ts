import { Component } from '@angular/core';
import { CounterFacade } from '@lazy-store-config/my-domain';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  constructor(public counter: CounterFacade) { }


}

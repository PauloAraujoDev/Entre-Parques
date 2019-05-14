import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnidadesconservacaoComponent } from 'src/app/unidadesconservacao/unidadesconservacao.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() filters: EventEmitter<any> = new EventEmitter();
  @Input() attractives$: Observable<any>;
  attractives = [];
  park: string;
  state: string;
  attractivesSelected = [];

  constructor() { }

  ngOnInit() {
    this.attractives$.subscribe(response => {
      this.populateAttractives(response);
    });
  }

  addOrRemoveAttractive(attractive: string): void {
    (this.attractivesSelected.find(x => x === attractive)) ?
    this.attractivesSelected.splice(this.attractivesSelected.indexOf(attractive), 1) : this.attractivesSelected.push(attractive);
    console.log(this.attractivesSelected);
  }

  populateAttractives(data: any): void {
    data.forEach(x => {
      if (x['attractive']) {
        x.attractive.forEach(element => {
          if (!this.attractives.find(y => y === element.name)) {
            this.attractives.push(element.name);
          }
        });
      }
    });
  }

  filterParameter(): void {
    this.filters.emit({ name: this.park, state: this.state, attractives: this.attractivesSelected });
  }

}


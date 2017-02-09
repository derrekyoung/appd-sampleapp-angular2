import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})
export class NamesComponent implements OnInit {
  private items = [];

  constructor(private http: Http, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    let data = { name: ''};

    this.http.get('http://jsonplaceholder.typicode.com/users/')
        .flatMap((data) => data.json())
        .subscribe((data:{ name } ) => {
          this.items.push(data.name);

          this.cd.detectChanges();
        });
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private items = [];

  constructor(private http: Http, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    let data = { name: ''};

    this.http.get('http://jsonplaceholder.typicode.com/posts/')
        .flatMap((data) => data.json())
        .subscribe((data:{ title } ) => {
          this.items.push(data.title);

          this.cd.detectChanges();
        });
  }

}

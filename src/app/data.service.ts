import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private url1 = "https://jsonplaceholder.typicode.com/posts/1";
  private url2 = "https://jsonplaceholder.typicode.com/posts/2";

  constructor(private jsonp: Jsonp, private http: Http) { }

  load1() {
    console.log("DataService.load1() URL: "+this.url1);
    // return this.http.get(this.url1)
    //                 .map((res:Response) => res.json());

  }

  load2() {
    console.log("DataService.load2()");
    return this.http.get(this.url2)
                    .map((res:Response) => res.json());
  }
}

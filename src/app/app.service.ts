import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {

    constructor(private http: Http) {
    }

    public hostname: string = 'http://school-artyr264.c9users.io:8081/';
    private token = JSON.parse(localStorage.getItem('token')) || '';

    public get(url) {
        const headers = new Headers({'x-access-token': this.token});
        const options = new RequestOptions({headers: headers});
        return this.http.get(this.hostname + url, options)
            .map((res: Response) => res.json());
    }

    public post(url, data) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': this.token});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.hostname + url, data, options)
            .map((res: Response) => res.json());
    }
    public put(url, data) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-access-token': this.token});
        const options = new RequestOptions({headers: headers});
        return this.http.put(this.hostname + url, data, options)
            .map((res: Response) => res.json());
    }
    public upload(url, data) {
        const headers = new Headers({'x-access-token': this.token, 'Accept': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.hostname + url, data, options)
            .map((res: Response) => res.json());
    }
}

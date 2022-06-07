import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.url
  private _auth: Auth | undefined

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { }

  loginService() {
    return this.http.get<Auth>(`${this.url}/usuarios/1`)
      .pipe(tap(auth => this._auth = auth))
  }









}

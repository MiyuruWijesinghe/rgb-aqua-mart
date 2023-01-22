import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';
import {tap} from 'rxjs/operators'
import { CambioPassword } from '../interfaces/cambio-password.interface';
import { EditForm } from '../interfaces/edit-form-interface';

// http://localhost:3000
const URL = environment.urlBackend;

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token');
  }

  getAll(){
    let headers = new HttpHeaders({
      'token': localStorage.getItem('token')
    });
    return this.http.get(`${URL}/brand/all`,{headers});
  }

  getById(id: string){
    let headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.get(`${URL}/brand/${id}`,{headers});
  }

  delete(id: string){
    let headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.delete(`${URL}/brand/${id}`, {headers});
  }

}

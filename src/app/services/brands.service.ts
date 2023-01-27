import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AddBrandForm } from '../interfaces/brands/add-brand-form.interface';
import { EditBrandForm } from '../interfaces/brands/edit-brand-form.interface';

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

  add(formData: AddBrandForm){
    let headers = new HttpHeaders({
      'username': localStorage.getItem('nombre')
    });
    return this.http.post(`${URL}/brand/save`, formData, {headers});
  }

  edit(id: string, editData: EditBrandForm){
    let headers = new HttpHeaders({
      'username': localStorage.getItem('nombre')
    });
    return this.http.put(`${URL}/brand/${id}`, editData, {headers});
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Brands } from '../../models/brands.model';
import { BrandService } from '../../services/brands.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styles: [
  ]
})
export class BrandsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  records: Brands[] = [];
  dtTrigger2: Subject<any> = new Subject<any>();

  formSubmitted = false;
  Statuses: any = ['Active', 'Inactive'];

  public addRecordForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    logoURL: ['', [Validators.required]],
    status: ['', [Validators.required]]
  });
  constructor(private brandSvc: BrandService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getAllRecords();
    this.dtOptions = {
      pageLength: 10,
      searching: true,
      responsive: true,
      info: true
    };
  }

  getAllRecords(){
    this.brandSvc.getAll().subscribe((res: any) => {
      this.records = res;
      this.dtTrigger2.next();
    });
  }

  createRecord(){
    this.formSubmitted = true;
    if (this.addRecordForm.invalid) {
      return;
    }
    this.brandSvc.add(this.addRecordForm.value).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Awesome!',
        text: 'Record created successfully.',
        showConfirmButton: true
      }).then((result) => {
        location.reload();
      });
    }, (err) => {
      const errorServer = JSON.parse(err.error);
      Swal.fire('Error', errorServer.message, 'error');
    });
  }

  viewRecord(id: string){
    this.brandSvc.getById(id).subscribe(res => {
      this.addRecordForm.setValue({
        name: res['name'],
        description: res['description'],
        logoURL: res['logoURL'],
        status: res['status']
      });
      $('#editRecord').modal('toggle');
      $('#editRecord').modal('show');
      localStorage.setItem('idRecord', res['id']);
    });
  }

  editRecord(){
    this.brandSvc.edit(localStorage.getItem('idRecord'), this.addRecordForm.value).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Awesome!',
        text: 'Record updated successfully.',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result) {
          localStorage.removeItem('idRecord');
          location.reload();
        }
      });
    }, (err) => {
      Swal.fire('Error', err.error.message, 'error');
    });
  }

  deleteRecord(id: string){
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandSvc.delete(id).subscribe((res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Record Deleted Successfully.',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result) {
              location.reload();
            }
          });
        }, (err) => {
          Swal.fire('Error', err.error.message, 'error');
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger2.unsubscribe();
  }

  get statuses(){
    return this.addRecordForm.get('status');
  }

  changeStatus(event){
    console.log(event.target.value);
    this.statuses.setValue(event.target.value, {
      onlySelf: true
    });
  }

  invalidField(campo: string): boolean{
    if (this.addRecordForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}

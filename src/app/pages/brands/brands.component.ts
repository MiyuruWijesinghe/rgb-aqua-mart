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
  Roles: any = ['admin', 'editor'];

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
              title: 'Record Deleted Successfully',
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
}

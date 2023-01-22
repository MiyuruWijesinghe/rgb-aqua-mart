import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  perfil = localStorage.getItem('nombre');

  menu1Items: any[];
  menu2Items: any[];
  menu3Items: any[];

  constructor(private sidebarService: SidebarService, private router: Router) {
    this.menu1Items = sidebarService.menu1;
    this.menu2Items = sidebarService.menu2;
    this.menu3Items = sidebarService.menu3;
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('nombre');
    this.router.navigateByUrl('/login');
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu1: any[] = [
      { title: 'Dashboard', url: 'usuarios', icon: '"nav-icon fas fa-tachometer-alt' },
      { title: 'Shops', url: 'usuarios', icon: '"nav-icon fa fa-shopping-cart' }
  ];

  menu2: any[] = [{
    title: 'Item Details',
    icon: '"nav-icon fa fa-shopping-bag',
    submenu: [
      { title: 'Brands', url: 'brands', icon: '"nav-icon fa fa-certificate' },
      { title: 'Categories', url: 'productos', icon: '"nav-icon fa fa-th-large' },
      { title: 'Sub Categories', url: 'stock', icon: '"nav-icon fa fa-th' },
      { title: 'Attributes', url: 'stock', icon: '"nav-icon fa fa-th-list' },
      { title: 'Attribute Values', url: 'stock', icon: '"nav-icon fa fa-list' },
      { title: 'Items', url: 'stock', icon: '"nav-icon fa fa-gift' },
      { title: 'Special Instructions', url: 'stock', icon: '"nav-icon fa fa-tasks' }
    ]
  }];

  menu3: any[] = [{
    title: 'User Details',
    icon: '"nav-icon fa fa-user-circle',
    submenu: [
      { title: 'Users', url: 'usuarios', icon: '"nav-icon fa fa-users' },
      { title: 'Roles', url: 'productos', icon: '"nav-icon fa fa-briefcase' },
      { title: 'Contacts', url: 'stock', icon: '"nav-icon fa fa-phone' },
      { title: 'Addresses', url: 'stock', icon: '"nav-icon fa fa-home' },
      { title: 'Identifications', url: 'stock', icon: '"nav-icon fa fa-id-badge' }
    ]
  }];
  constructor() { }
}

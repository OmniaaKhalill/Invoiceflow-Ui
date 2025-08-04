import { Routes } from '@angular/router';
import { ItemsComponent } from './pages/items/items/items.component';
import { InvoicesComponent } from './pages/Invoices/invoices/invoices.component';
import { CashiersComponent } from './pages/Cashier/cashiers/cashiers.component';
import { AddCashierComponent } from './pages/Cashier/add-cashier/add-cashier.component';
import { EditCashierComponent } from './pages/Cashier/edit-cashier/edit-cashier.component';
import { CashierDetailsComponent } from './pages/Cashier/cashier-details/cashier-details.component';
import { ItemDetailsComponent } from './pages/items/item-details/item-details.component';

export const routes: Routes = [


      { path: '', redirectTo: 'Invoices', pathMatch: 'full' },

  {
    path: 'Cashiers',
    component:  CashiersComponent,
    data: { title: 'Cashiers'}}
  

,
      {
    path: 'Items',
    component:ItemsComponent ,
    data: { title: 'Items'}},

      {
    path: 'Invoices',
    component: InvoicesComponent ,
    data: { title: 'Invoices'}}
,

       {
    path: 'AddCashier',
    component: AddCashierComponent ,
    data: { title: 'Add-Cashier'}}

      ,   {
    path: 'EditCashier',
    component: EditCashierComponent ,
    data: { title: 'Edit-Cashier'}}

      ,   {
    path: 'CashierDetails',
    component: CashierDetailsComponent ,
    data: { title: 'CashierDetails'}}
        ,   {
    path: 'Items',
    component: ItemsComponent ,
    data: { title: 'Items'}}

            ,   {
    path: 'ItemDetails',
    component: ItemDetailsComponent ,
    data: { title: 'ItemDetails'}}
];

import { Routes } from '@angular/router';
import { ItemsComponent } from './pages/items/items/items.component';
import { InvoicesComponent } from './pages/Invoices/invoices/invoices.component';
import { CashiersComponent } from './pages/Cashier/cashiers/cashiers.component';
import { AddCashierComponent } from './pages/Cashier/add-cashier/add-cashier.component';
import { EditCashierComponent } from './pages/Cashier/edit-cashier/edit-cashier.component';
import { CashierDetailsComponent } from './pages/Cashier/cashier-details/cashier-details.component';
import { ItemDetailsComponent } from './pages/items/item-details/item-details.component';
import { AddItemComponent } from './pages/items/add-item/add-item.component';
import { EditItemComponent } from './pages/items/edit-item/edit-item.component';
import { AddInvoiceComponent } from './pages/Invoices/add-invoice/add-invoice.component';
import { InvoiceDetailsComponent } from './pages/Invoices/invoice-details/invoice-details.component';
import { EditInvoiceComponent } from './pages/Invoices/edit-invoice/edit-invoice.component';

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

                ,   {
    path: 'AddItem',
    component: AddItemComponent ,
    data: { title: 'Add-Item'}}

                    ,   {
    path: 'EditItem',
    component: EditItemComponent ,
    data: { title: 'Edit-Item'}}



      ,   {
    path: 'Invoices',
    component: InvoicesComponent ,
    data: { title: 'Invoices'}}

            ,   {
    path: 'InvoiceDetails',
    component: InvoiceDetailsComponent ,
    data: { title: 'ItemDetails'}}

                ,   {
    path: 'AddInvoice',
    component: AddInvoiceComponent ,
    data: { title: 'Add-Invoice'}}

                    ,   {
    path: 'EditInvoice',
    component: EditInvoiceComponent ,
    data: { title: 'Edit-Invoice'}}
];


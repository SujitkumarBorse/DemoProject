import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public loading = true;
  public productList: any;
  public filterCategory: any
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService, private _notifyService: NotificationService) { }

  ngOnInit(): void {
    let newPrice;
    this.loading = true;
    this.api.getProduct()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          if (a.price <= 100) {
            newPrice = a.price;
            Object.assign(a, {price: a.price, quantity: 1, total: newPrice });
          } else if (a.price > 101 && a.price <= 500) {
            newPrice = a.price - (a.price * 0.1);
            Object.assign(a, {price: a.price, quantity: 1, total: newPrice });
          } else if (a.price > 500) {
            newPrice = a.price - (a.price * 0.2)
            Object.assign(a, {price: a.price, quantity: 1, total: newPrice });
          }
        });
        this.loading = false;
      });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
    this._notifyService.showSuccess("Item Added in Cart!!!", "Alert");
  }

}

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService, private _notifyService  : NotificationService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
    this._notifyService.showWarning("Item remove from Cart!!!", "Alert")
  }
  emptycart(){
    this.cartService.removeAllCart();
    this._notifyService.showWarning("Cart Empty!!!", "Alert")
    
  }
}

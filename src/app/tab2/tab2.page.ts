import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WordpressService } from '../services/product.service';
import { CartService } from '../services/productInfo.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  posts = [];
  page = 1;
  count = null;
  chartlist = [];
  constructor(private wp: WordpressService, private loadingCtrl: LoadingController, private productSerice : CartService) { }
 
  ngOnInit() {
    this.loadPosts();
  }
 
  async loadPosts() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await loading.present();
 
    this.productSerice.getTop5ChartTrend().subscribe(res => {
      this.chartlist=res.product;
    
      loading.dismiss();
    });
  }
 
  loadMore(event) {
    this.page++;
 
    this.wp.getPosts(this.page).subscribe(res => {
      this.posts = [...this.posts, ...res];
      event.target.complete();
 
      // Disable infinite loading when maximum reached
      if (this.page == this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }

}

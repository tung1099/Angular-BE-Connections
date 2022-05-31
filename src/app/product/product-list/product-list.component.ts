import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    p: number = 1;
    products: Product[] = [];

    constructor(private productService: ProductService,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.getAllProduct();
    }

    getAllProduct() {
        this.productService.getAll().subscribe(products => {
            // @ts-ignore
            this.products = products.content;
        });
    }
}


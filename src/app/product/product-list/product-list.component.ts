import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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
            // tslint:disable-next-line:only-arrow-functions
            $(function() {
                $('#products').DataTable({
                    paging: true,
                    lengthChange: false,
                    searching: true,
                    ordering: true,
                    info: true,
                    pageLength: 3,
                    autoWidth: false,
                    responsive: true,
                });
            });
        }, (error) => {
            console.log(error);
        });
    }

}

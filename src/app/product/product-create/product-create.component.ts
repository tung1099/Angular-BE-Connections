import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';
import {Product} from '../../model/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product[] = [];
  categories: Category[] = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('')
  });
  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  submit() {
    if (this.productForm.invalid) {
      return;
    } else {
      const product = this.productForm.value;
      product.category = {
        id: product.category
      };
      this.productService.saveProduct(product).subscribe(() => {
        Swal.fire({
          position: 'top-left',
          icon: 'success',
          title: 'Thêm mới thành công',
          showConfirmButton: false,
          timer: 1500
        });
      });
      this.productForm.reset();
    }
  }
  get nameControl() {
    return this.productForm.get('name');
  }
  get priceControl() {
    return this.productForm.get('price');
  }
  get descriptionControl() {
    return this.productForm.get('description');
  }
  getAllCategories() {
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
    }, (error) => {
      alert(error);
        }
    );
  }
}

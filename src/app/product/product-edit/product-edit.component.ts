import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('')
  });
  id: number;
  categories: Category[] = [];
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.getProductById(this.id);
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }

  private getProductById(id: number) {
    return this.productService.findById(id).subscribe((product) => {
      this.productForm = new FormGroup({
        id: new FormControl(product.id),
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
        category: new FormControl(product.category.id),
      });
    });
  }

  editProduct(id: number) {
    if (this.productForm.invalid) {
      return;
    } else  {
      const product = this.productForm.value;
      product.category = {
        id: product.category
      };
      this.productService.editProduct(id, product).subscribe(() => {
        Swal.fire({
          position: 'top-left',
          icon: 'success',
          title: 'Chỉnh sửa thành công',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/product/list']);
      });
    }
  }
  private getAllCategories() {
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
    }, (error) => {
      alert(error);
    });
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
}

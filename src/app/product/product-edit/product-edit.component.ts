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
  selectedFile = new File(['name'], 'fileName.jpg');
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('')
  });
  id: number;
  categories: Category[] = [];
  image = null;
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
  onSelectedFile(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  private getProductById(id: number) {
    return this.productService.findById(id).subscribe((product) => {
      this.image = product.image;
      this.productForm = new FormGroup({
        id: new FormControl(product.id),
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
        image: new FormControl(),
        category: new FormControl(product.category.id),
      });
    });
  }

  editProduct(id: number) {
    if (this.productForm.invalid) {
      return;
    } else  {
      const product: FormData = new FormData();
      product.append('id', this.productForm.get('id').value);
      product.append('name', this.productForm.get('name').value);
      product.append('price', this.productForm.get('price').value);
      product.append('description', this.productForm.get('description').value);
      product.append('image', this.selectedFile);
      product.append('category', this.productForm.get('category').value);
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
   getAllCategories() {
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

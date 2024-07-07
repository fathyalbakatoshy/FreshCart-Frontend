import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  subCategories: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();

  }

  initForm(): void {
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required]],
      description: [''],
      isActive: [true],
      featured: [false],
      tags: [[]],
      metaTitle: [''],
      metaDescription: ['']
    });
  }

  onSubmit(): void {
    if (this.addCategoryForm.valid) {
      this.categoryService.addCategory(this.addCategoryForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added successfully!' });
          this.addCategoryForm.reset();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        }
      });
    }
  }
}

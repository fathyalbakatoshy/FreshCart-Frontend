import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CategoryService } from '../../category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  editCategoryForm: FormGroup;
  category: any = this.dynamicDialogConfig.data;

  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editCategoryForm = this.fb.group({
      name: [this.category.name, [Validators.required, Validators.minLength(3)]],
      image: [this.category.image, [Validators.required]],
      description: [this.category.description],
      isActive: [this.category.isActive],
      featured: [this.category.featured],
      tags: [this.category.tags],
      metaTitle: [this.category.metaTitle],
      metaDescription: [this.category.metaDescription]
    });
  }

  onSubmit(): void {
    if (this.editCategoryForm.valid) {
      const updatedCategory = { ...this.editCategoryForm.value, _id: this.category._id };

      this.categoryService.updateCategory(updatedCategory).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully!' });
          this.dynamicDialogRef.close(updatedCategory);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        }
      });
    }
  }
}

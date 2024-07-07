import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddCategoryComponent } from '../add-category/add-category.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryList: any[] = [];
  loading = true;

  constructor(private categoryService: CategoryService,
    private dynamicDialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching categories', error);
        this.loading = false;
      }
    );
  }

  addCategory(): void {
    this.dynamicDialogService.open(AddCategoryComponent, {
      header: 'Add Category',
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' }
    }).onClose.subscribe(() => this.loadCategories());
  }

  editCategory(category: any): void {
    this.dynamicDialogService.open(EditCategoryComponent, {
      data: category,
      header: 'Edit Category',
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' }
    }).onClose.subscribe(() => this.loadCategories());
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this Item',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            // Handle success
            this.categoryService.deleteCategory(id).subscribe(
                () => {
                    this.loadCategories();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully!' });
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                }
            );
        },

    });
  }
}

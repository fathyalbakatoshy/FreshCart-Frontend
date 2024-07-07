import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';
import { User } from '../../User';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

    userList: User[];
    loading: boolean = true;
    ref: DynamicDialogRef;

    constructor(
        private userService: UsersService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getAllUsers().subscribe({
            next: (data) => {
                this.userList = data;
                this.loading = false;
            },
            error: (err) => {
                if (err.status === 403) {
                    this.router.navigate(['/auth/access']);
                }
            }
        });
    }

    addUser(): void {
        this.ref = this.dialogService.open(AddUserComponent, {
            header: 'Add User',
            width: '50%',
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000,

        });
        this.ref.onClose.subscribe((data: any) => {
            if (data) {
                this.getAllUsers();
            }
        });
    }

    editUser(user): void {
        this.ref = this.dialogService.open(EditUserComponent, {
            header: 'Update User',
            width: '50%',
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000,
            data: user
        });
        this.ref.onClose.subscribe((data: any) => {
            if (data) {
                this.getAllUsers();
            }
        });
    }

    viewUser(user): void {
        this.ref = this.dialogService.open(ViewUserComponent, {
            header: 'View User',
            width: '50%',
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000,
            data: user
        });
    }

    deleteItem(id: string): void {
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
                this.userService.deleteUser(id).subscribe({
                    next: (data) => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted' });
                        this.getAllUsers();
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    }
                })
            }
        });
    }
}

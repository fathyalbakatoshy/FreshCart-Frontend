import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from '../../User';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    editUser: FormGroup;
    user: User = this.dynamicDialogConfig.data;
    roles = [
        { label: 'Admin', value: 'Admin' },
        { label: 'SuperAdmin', value: 'SuperAdmin' },
        { label: 'Sales', value: 'Sales' },
        { label: 'Customer', value: 'Customer' }
    ];

    active = [{
        label: 'True',
        value: true
    }, {
        label: 'False',
        value: false
    }];

    blocked = [{
        label: 'True',
        value: true
    }, {
        label: 'False',
        value: false
    }];

    verified = [{
        label: 'True',
        value: true
    }, {
        label: 'False',
        value: false
    }];

    constructor(
        private dynamicDialogRef: DynamicDialogRef,
        private dynamicDialogConfig: DynamicDialogConfig,
        private fb: FormBuilder,
        private messageService: MessageService,
        private userservice: UsersService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.editUser = this.fb.group({
            username: [this.user.username, [Validators.required, Validators.pattern(/^[A-Za-z0-9_]+$/)]],
            name: [this.user.name, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]],
            phone: [this.user.phone, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
            role: [this.user.role, Validators.required],
            isActive: [this.user.isActive, Validators.required],
            isBlocked: [this.user.isBlocked, Validators.required],
            isVerified: [this.user.isVerified, Validators.required]
        });
    }

    onSubmit(form: FormGroup): void {
        console.log(form.value);

        if (form.valid) {
            const updatedUser = { ...form.value, _id: this.user._id };

            this.userservice.updateUser(updatedUser).subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully!' });
                    this.dynamicDialogRef.close(data);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
                }
            });
        }
    }
}

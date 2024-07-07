import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from '../../User';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
    addUser: FormGroup;
    roles: { label: string, value: string }[] = [
        { label: 'Admin', value: 'Admin' },
        { label: 'SuperAdmin', value: 'SuperAdmin' },
        { label: 'Sales', value: 'Sales' },
        { label: 'Customer', value: 'Customer' }
      ];

    constructor(
        private dynamicDialogRef:DynamicDialogRef,
        private dynamicDialogConfig: DynamicDialogConfig,
        private fb: FormBuilder,
        private messageService: MessageService,
        private userservice: UsersService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.addUser = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9_]+$/)]],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['Customer', Validators.required],
        });
    }

    onSubmit(form:FormGroup): void {
        if(form.valid) {
            this.userservice.addUser(form.value).subscribe({
                next: (data) => {
                    this.messageService.add({severity:'success', summary: 'Success', detail: 'User added successfully'});
                    this.dynamicDialogRef.close(data);
                },
                error: (err) => {
                    this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
                }
            });
        }
    }

}

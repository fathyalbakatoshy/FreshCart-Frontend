import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private toast: MessageService,
        private router: Router
    ) {}

    initForm() {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.initForm();
    }

    register(form: FormGroup) {
        if (form.valid) {
            this.auth.register(form.value).subscribe({
                next: (data) => {
                    this.toast.add({ severity: 'success', summary: 'Registration', detail: 'Registration Successful' });
                    this.router.navigate(['/auth/login']);
                },
                error: (err) => {
                    this.toast.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    form.reset();
                },
            });
        }
    }
}

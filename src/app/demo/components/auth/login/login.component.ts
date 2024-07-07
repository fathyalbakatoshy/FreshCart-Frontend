import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private auth: AuthService,
        private fb: FormBuilder,
        private toast: MessageService,
        private router: Router
    ) { }

    initForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            rememberMe: [false]  // إضافة حقل "Remember Me" إلى النموذج
        });
    }

    ngOnInit(): void {
        this.initForm();
    }

    login(form: FormGroup) {
        if (form.valid) {
            const { email, password, rememberMe } = form.value;
            this.auth.login({ email, password }).subscribe({
                next: (data) => {
                    this.toast.add({ severity: 'success', summary: 'Login', detail: 'Login Successful' });
                    localStorage.setItem('token', data.token);
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                    } else {
                        sessionStorage.setItem('rememberMe', 'false');
                    }

                    this.router.navigate(['/']);
                },
                error: (err) => {
                    this.toast.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    form.reset();
                },
            });
        }
    }
}

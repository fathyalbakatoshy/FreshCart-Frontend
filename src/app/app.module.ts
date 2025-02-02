import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TokenInterceptor } from './core/interceptor/user-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({

    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastModule,
        ReactiveFormsModule,
        FormsModule,
        MessagesModule,
        ConfirmDialogModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MessageService, ConfirmationService,DialogService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

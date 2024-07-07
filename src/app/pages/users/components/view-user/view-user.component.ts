import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { User } from '../../User';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit {
    user: User = this.dynamicDialogConfig.data;
    constructor(
        private dynamicDialogConfig: DynamicDialogConfig,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        this.getUser(this.user._id);
    }

    getUser(id): void {

        this.usersService.getUser(id).subscribe({
            next: (data) => {
                this.user = data;
                console.log(data);

            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    convertTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US');
      }
}

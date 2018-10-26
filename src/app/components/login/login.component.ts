import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jauc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    constructor(public user: UserService, public dialog: MatDialog) {}

    ngOnInit() {}

    openDialog(): void {
        const dialogRef = this.dialog.open(LoginDialog, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}

@Component({
    selector: 'jauc-login-dialog',
    templateUrl: './dialog/login-dialog.html',
    styleUrls: ['./login.component.css'],
})
export class LoginDialog {
    constructor(public dialogRef: MatDialogRef<LoginDialog>, @Inject(MAT_DIALOG_DATA) public data) {}

    loginWithGoogle(): void {
        this.data.user.loginWithGoogle();
        // this.dialogRef.close();
    }
}

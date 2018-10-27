import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jauc-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {}
    ngOnInit(): void {}

    loginWithGoogle(): void {
        this.data.user.loginWithGoogle();
        // this.dialogRef.close();
    }
}

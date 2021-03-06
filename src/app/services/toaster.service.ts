import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    constructor(public toaster: MatSnackBar) {}

    /**
     * @param message message to display
     * @param action (link)
     */
    showToast(message: string, action: string, duration = 2000) {
        this.toaster.open(message, action, {
            duration,
        });
    }
}

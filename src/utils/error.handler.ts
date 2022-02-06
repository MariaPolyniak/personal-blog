import { ErrorHandler, Injectable, NgZone } from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private _snackbar: MatSnackBar,  private _zone: NgZone) {}

  handleError(error) {
    console.dir(error)
    this._zone.run(() => {
      this._snackbar.open(`Something went wrong -> ${error?.error?.message || error.message}`, 'x');
    });
  }
}


import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthTokenService } from "../services/auth-token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authTokenService: AuthTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authTokenService.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

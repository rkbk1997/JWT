import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor(private injector: Injector) { }
  intercept(req, next): any{
    const authService = this.injector.get(AuthService);
    const tokenizesreq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.gettoken()}`
      }
    });
    console.log(tokenizesreq);
    return next.handle(tokenizesreq);
  }
}

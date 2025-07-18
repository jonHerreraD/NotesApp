import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      // Clone the request and set the new header
      req = req.clone({
        headers: new HttpHeaders('Authorization').set('Authorization', `Bearer ${token}`)
      });


      console.log('Intercepted! Token:', token);
      console.log('Request URL:', req.url);
      console.log('Authorization Header:', req.headers.get('Authorization'));

      return next.handle(req);
    }

    console.log('No token found, proceeding without auth header');
    return next.handle(req);
  }
}

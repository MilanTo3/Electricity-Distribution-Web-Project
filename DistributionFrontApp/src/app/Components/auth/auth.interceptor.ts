import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoggedUser } from "src/app/Models/LoggedUser.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router: Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = JSON.parse(sessionStorage.getItem('loggedUser'));
        if(sessionStorage.getItem('loggedUser') != null){
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + user.token, )             
            });
            return next.handle(clonedReq).pipe(tap(
                succ => {},
                err => {
                    if(err.status == 401){
                        sessionStorage.clear();
                        this.router.navigate(["/login-register"]);
                    }
                }
            ));
        }else{
            return next.handle(req.clone());
        }
    }

}
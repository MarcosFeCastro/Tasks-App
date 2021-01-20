import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    constructor( private sotrageService: StorageService ) {}

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        if( req.url.substring( 0, environment.api_url.length ) == environment.api_url ) {
            return next.handle( req.clone( { headers: req.headers.set( 'Authorization', this.sotrageService.getLocalUser()['token'] ) } ) )
        } else { return next.handle( req ) }
    }

}

export const HttpsRequestInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpsRequestInterceptor,
    multi: true,
};
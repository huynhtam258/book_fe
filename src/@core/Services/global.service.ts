import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GlobalService {
    handler = new BehaviorSubject<any>({});
    constructor() { }
    
}
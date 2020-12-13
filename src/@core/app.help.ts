import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AppHelper {
    constructor() { }
    public static ROUTER_NAVIGATE_AUTH = '/auth';
    public static ROUTER_NAVIGATE_LOGIN = '/auth/login';
    public static ROUTER_NAVIGATE_REGISTER = '/auth/register';
    public static ROUTER_NAVIGATE_ADMIN = '/admin';
    public static ROUTER_NAVIGATE_AUTOR_MANAGER = '/admin/author_manager';

    public static ROUTER_NAVIGATE_PAGE= '/'
    public static ROUTER_NAVIGATE_BOOK = '/book';
    public static ROUTER_NAVIGATE_BOOK_DETAIL = '/book/detail';
    public static ROUTER_NAVIGATE_BOOK_BY_AUTHOR = '/book/bookByAuthor';
    public static ROUTER_NAVIGATE_BOOK_BY_CATEGORY = '/book/bookByCategory';
    public static ROUTER_NAVIGATE_ABOUT_US = '/book/aboutUS';

    title = {
        'list_book': 'Danh sách các loại sách',
        'list_author': 'Danh sách tác giả',
        
    }
    
}
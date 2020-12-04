import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
// import { Observable } from 'rxjs/Observable';

// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { ReviewComment } from '../models/comment';
import { BookDetailComponent } from 'src/app/book/book-detail/book-detail.component';
import { Category } from '../models/category';
import { Author } from '../models/author';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    selectedAuthor: Author;
    selectedBook: any;
    selectedComment: Comment;
    // books: Book[];
    constructor(private http: HttpClient) { }

    getBook() {
        return this.http.get(environment.apiBaseUrl + '/getall');
    }
    getBookByAuthor(author) {
        // const url = environment.apiBaseUrl + '/getbookauthor' + '?author=' + this.selectedAuthor;
        const url = environment.apiBaseUrl + '/getbookauthor' + '?author=' + author;
        return this.http.get(url);
    }
    getBookByCategory(category) {
        // const url = environment.apiBaseUrl + '/getbookauthor' + '?author=' + this.selectedAuthor;
        const url = environment.apiBaseUrl + '/getbookcategory' + '?category=' + category;
        return this.http.get(url);
    }
    getBookById(id) {
        const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        return this.http.get(environment.apiBaseUrl + '/' + id, { headers: reqHeader });
    }
    
    postBook(createbook: Book, file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        console.log(file);
        formdata.append('file', file);
        formdata.append('bookName', createbook.bookName);
        formdata.append('author', createbook.author);
        formdata.append('bookContent', createbook.bookContent);
        formdata.append('category', createbook.category);
        formdata.append('releaseDate', createbook.releaseDate);
        console.log('Formdata [bookName]: ', formdata.get('bookName'));
        // console.log('Formdata [image]: ', formdata.get('file'));
        // formdata.append('file', createbook.image);

        const req = new HttpRequest('POST', environment.apiBaseUrl + '/create', formdata, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    // putBook(book: Book) {
    //     // return this.http.put(environment.apiBaseUrl + `/edit/${book._id}`, book);
    //     return this.http.post(environment.apiBaseUrl + `/edit/${book._id}`, book);
    // }
    putBook(editBook: Book, file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        console.log(file);
        formdata.append('file', file);
        formdata.append('bookName', editBook.bookName);
        formdata.append('author', editBook.author);
        formdata.append('bookContent', editBook.bookContent);
        formdata.append('category', editBook.category);
        formdata.append('releaseDate', editBook.releaseDate);
        console.log('Formdata [bookName]: ', formdata.get('bookName'));
        // console.log('Formdata [image]: ', formdata.get('file'));
        // formdata.append('file', createbook.image);

        const req = new HttpRequest('POST', environment.apiBaseUrl + `/edit/${editBook._id}`, formdata, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    deleteBook(_id: String) {
        return this.http.delete(environment.apiBaseUrl + `/delete/${_id}`);
    }
    deleteCategory(_id: String) {
        return this.http.delete(environment.apiBaseUrl + `/deleteCategory/${_id}`);
    }
    getComment(bookId: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.get(environment.apiBaseUrl + '/getcmtbook/' + bookId, { headers: headers }).catch(err => {
            return Observable.throw(err);
        });
    }
    postComment(reviewComment: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(environment.apiBaseUrl + '/comment/post', // => continue
            {
                nameReviwer: reviewComment.nameReviwer,
                contentcomment: reviewComment.contentcomment,
                bookId: reviewComment.bookId,
                rate: reviewComment.rate,
                date: reviewComment.date,
                childReviewer: reviewComment.childReviewer
            },
            { headers: headers }).catch(err => {
                return Observable.throw(err);
            });
    }

    deleteComment(_id: String) {
        return this.http.delete(environment.apiBaseUrl + `/deleteComment/${_id}`);
    }

    getCategory() {
        return this.http.get(environment.apiBaseUrl + '/getcategory');
    }
    postCategory(createCategory: Category): Observable<any> {
        console.log('Category-Service: ', createCategory);
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(environment.apiBaseUrl + '/category/post', // => continue
            {
                categoryName: createCategory.categoryName,
            },
            { headers: headers }).catch(err => {
                return Observable.throw(err);
            }
            );
    }
    putCategory(editCategory: any): Observable<any> {
        console.log('BookService Category: ', editCategory);
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(environment.apiBaseUrl + `/editCategory/${editCategory.categoryid}`, // => continue
            {
                categoryName: editCategory.categoryName,
            },
            { headers: headers }).catch(err => {
                return Observable.throw(err);
            });
    }

    getAuthors() {
        return this.http.get(environment.apiBaseUrl + '/getauthor');
    }

    postAuthor(createAuthor: Author, file: File): Observable<HttpEvent<{}>> {
        console.log(createAuthor);
        const formdata: FormData = new FormData();
        console.log(file);
        formdata.append('file', file);
        formdata.append('authorName', createAuthor.authorName);
        formdata.append('quote', createAuthor.quote);
        formdata.append('interviewContent', createAuthor.interviewContent);
        formdata.append('category', createAuthor.category);
        formdata.append('releaseDate', createAuthor.releaseDate);
        console.log('Formdata [authorName]: ', formdata.get('authorName'));

        const req = new HttpRequest('POST', environment.apiBaseUrl + '/createAuthor', formdata, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    putAuthor(editAuthor: Author, file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        console.log(file);
        formdata.append('file', file);
        formdata.append('authorName', editAuthor.authorName);
        formdata.append('quote', editAuthor.quote);
        formdata.append('interviewContent', editAuthor.interviewContent);
        formdata.append('category', editAuthor.category);
        formdata.append('releaseDate', editAuthor.releaseDate);
        const req = new HttpRequest('PUT', environment.apiBaseUrl + `/editAuthor/${editAuthor._id}`, formdata, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    getAuthorById(id) {
        const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        return this.http.get(environment.apiBaseUrl + '/author/' + id, { headers: reqHeader });
    }

    deleteAuthor(_id: String) {
        return this.http.delete(environment.apiBaseUrl + `/deleteAuthor/${_id}`);
    }

    sendCommentChild(body){
        return this.http.post(environment.apiBaseUrl + `/childcomment/create`,body);
    }

    getChildComment(id){
        return this.http.get(environment.apiBaseUrl + '/getchildcmt/' + id);
    }
}

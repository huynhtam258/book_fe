import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
@Injectable({ providedIn: 'root' })
export class UploadService {
    // title = "cloudsSorage";
    selectedFile: File = null;
    fb= new BehaviorSubject<string>('');
    downloadURL: any;

    constructor(
        private storage: AngularFireStorage) { }
    onFileSelected(event) {
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`RoomsImages/${n}`, file);
        task.snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadURL = fileRef.getDownloadURL();
                    this.downloadURL.subscribe(url => {
                        console.log(url)
                        if (url) {
                            console.log(url) 
                            this.fb.next(url)
                        }
                        console.log(this.fb);
                    });
                })
            )
            .subscribe(url => {
                if (url) {
                    console.log(url);
                }
            });
    }
}
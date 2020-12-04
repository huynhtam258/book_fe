import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstpageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.router.navigate(['book']);
    }, 5000);  // 5s
    this.incLoader();
  }

  incLoader() {
    let t = 0;
    const x = setInterval(function () {
      t++;
      $('.loadernum').text(t + '%');
      if (t === 100) {
        clearInterval(x);
      }
    }, 200);
  }


}


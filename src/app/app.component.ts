import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = "Alisitair's Note";

  addFormToggle: boolean;
  postData: any;

  constructor(
    private http: HttpClient,
    private nDataService: DataService

  ) { }
  ngOnInit() {

    console.log('Add entry fired');
    this.nDataService.onfetchData();

  }



  addEntry() {


    this.addFormToggle = true;
    console.log(this.addFormToggle);
  }

  onSubmit(form: NgForm) {
    console.log(form.value.title);
    console.log(form.value.text);


    this.postData = { title: form.value.title, content: form.value.text };

    this.nDataService.onCreatePost(this.postData);
    this.nDataService.addToDatabase();
}


// export class AppComponent implements OnInit {

  // title = 'my-first-angular-project';
  // OpenSideNav;

  // constructor( private authService: AuthService) {}

  // ngOnInit() {
  //   this.authService.innitAuthListener();
  // }



// }



}

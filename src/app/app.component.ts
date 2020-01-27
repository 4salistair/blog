import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = "Alisitair's Note";

  addFormToggle: boolean;
  displayAddButton: boolean;
  displaySaveButton: boolean;
  postData: any;
  loadedPosts: Post[] = [];

  constructor(
    private http: HttpClient,
    private nDataService: DataService

  ) { }
  ngOnInit() {

    console.log('Add entry fired');
    this.fetchData();
    this.displayAddButton = true;
    this.displaySaveButton = false;

  }



  addEntry() {
    this.addFormToggle = true;
    this.displayAddButton = false;
    this.displaySaveButton = true;
  }

  onSubmit(form: NgForm) {

    this.postData = { title: form.value.title, content: form.value.text };
    this.nDataService.onCreatePost(this.postData);
    this.nDataService.addToDatabase();
    this.addFormToggle = false;

}

private fetchData() {

  this.http.get
  <{ [key: string]: Post}>
  ('https://robust-seat-226817.firebaseio.com/posts.json')
   .pipe(                                                // pipe enables returned obserable data to be funnels through operators
   map((responseData: { [key: string]: Post}) => {     // map is an agrument of pipe enables
                                                        // data to be rtrn as observable in another strcuture,
                                                        // here as defining data will be in a Post- type/model
   const postsArray: Post[] = [];                      // in the case we are returning an Array of Post data model
                                                        // from the JSON object returned from datastore
   for (const key in responseData) {                   // looping through response data
     if (responseData.hasOwnProperty(key)) {           // checking there is a key value on the response data
     postsArray.push({...responseData[key], id: key}); // pushing each response data row onto array and using id (from datastore)as key.
      }
     }
   return postsArray;                                  // returns the new Array
   })
  )
  .subscribe( posts => {
    console.log(posts);
    this.loadedPosts = posts;
  });
}



}

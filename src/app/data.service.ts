import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable()

export class DataService {

loadedPosts: Post[] = [];

    constructor(
        private http: HttpClient
    ) {}



addToDatabase() { }

onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post< {title: string}>(
        'https://robust-seat-226817.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onfetchData() {
    this.fetchData();
  }

  private fetchData() {

     this.http.get
     <{ [key: string]: Post}>
     ('https://backendtest-53d12.firebaseio.com/posts.json')
      .pipe(                                                // pipe enables returned obserable data to be funnels through operators
      map((responseData: { [key: string]: Post}) => {       // map is an agrument of pipe enables
                                                            // data to be rtrn as observable in another strcuture,
                                                            // here as defining data will be in a Post- type/model
      const postsArray: Post[] = [];                        // in the case we are returning an Array of Post data model
                                                            // from the JSON object returned from datastore
      for (const key in responseData) {                     // looping through response data
        if (responseData.hasOwnProperty(key)) {             // checking there is a key value on the response data
        postsArray.push({...responseData[key], id: key});   // pushing each response data row onto array and using id (from datastore)as key.
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



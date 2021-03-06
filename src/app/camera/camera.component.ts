import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements

OnInit {

  @ViewChild('video')
    public video: ElementRef;

  @ViewChild('canvas')
    public canvas: ElementRef;

  public captures: Array<any>;

  public constructor() {
    this.captures = [];
  }

ngOnInit() { }


public ngAfterViewInit()  {

  const mediaSource = new MediaSource();

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        console.log('in the navigator function ');

      });
  }

}

public capture() {
      var context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
      this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
}

}

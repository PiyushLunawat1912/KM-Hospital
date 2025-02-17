import { Component } from '@angular/core';

interface ImageItem {
  url: string;
  name: string;
}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
    images: ImageItem[] = [
     {url:'assets/img/gallery/Hospital3.jpg', name:"KM Homspital"},
      {url:'assets/img/gallery/Hospital9.jpg',name:"Passage"},
     {url: 'assets/img/gallery/Hospital1.jpg',name:"Reception"},
      {url:'assets/img/gallery/Hospital7.jpg',name:"OPD"},
      {url:'assets/img/gallery/Hospital8.jpg',name:"OPD"},
      {url:'assets/img/gallery/Hospital4.jpg', name:"Semi Private Room"},
      {url:'assets/img/gallery/Hospital10.jpg',name:"Semi Private Room"},
      {url:'assets/img/gallery/Hospital13.jpg',name:"Dulex Room"},
      {url:'assets/img/gallery/Hospital12.jpg',name:"Dulex Room"},
      {url:'assets/img/gallery/Hospital2.jpg',name:"Recovery Ward"},
      {url:'assets/img/gallery/Hospital6.jpg',name:"General Ward"},
      {url:'assets/img/gallery/Hospital11.jpg',name:"General Ward"},
     
    ];
  }


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];
  currentIndex: number = 0;
  translateX: number = 0;

  onLeftArrowClick(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.translateX += 33.3;
    }
  }

  onRightArrowClick(): void {
    if (this.currentIndex < this.images.length - 3) {
      this.currentIndex++;
      this.translateX -= 33.3;
    }
  }
}

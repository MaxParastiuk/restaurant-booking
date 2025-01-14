import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input()
  total: number = 0;
  @Input() limit: number = 9;
  @Output() changePage = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) {}

  pages: number[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total'] || changes['limit']) {
      // reset currentPage

      // recalculate amount of pages
      const pagesCount = Math.ceil(this.total / this.limit);
      this.pages = this.range(1, pagesCount);
      if (this.currentPage > pagesCount) {
        this.changePage.emit(1);
      }
    }
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }
}

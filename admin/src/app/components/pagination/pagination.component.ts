import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() perPage = 10;
  @Input() totalRecords!: number;
  @Output() pageChange = new EventEmitter<number>();
  @Input() currentPage = 1;

  get totalPages() {
    return Math.ceil(this.totalRecords / this.perPage);
  }

  get from() {
    return (this.currentPage - 1) * this.perPage + 1;
  }

  get to() {
    return Math.min(this.currentPage * this.perPage, this.totalRecords);
  }

  generatePageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page = 1) {
    this.currentPage = page;
    this.pageChange.next(this.currentPage);
  }

  onNext() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage++;
    this.onPageChange(this.currentPage);
  }

  onPrev() {
    if (this.currentPage === 1) return;
    this.currentPage--;
    this.onPageChange(this.currentPage);
  }

}

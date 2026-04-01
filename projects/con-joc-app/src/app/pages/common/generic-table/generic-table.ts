import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationConfig, TableColumn, TableComponent, TableConfig, UserData, ButtonType } from '@eh-library/common';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './generic-table.html',
  styleUrl: './generic-table.scss',
})
export class GenericTable implements OnInit, OnChanges {

  @Input() title = 'Table';
  @Input() columns: TableColumn[] = [];
  @Input() rows: UserData[] = [];
  @Input() config: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: false
  };
  @Input() pageSizeOptions: number[] = [20, 40, 60, 80, 100];
  @Input() extraButtons: { label: string; type?: ButtonType; icon?: string; disabled?: boolean; click?: () => void }[] = [];

  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sizeChange = new EventEmitter<number>();

  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable();
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  fullData: UserData[] = [];
  currentPage = 1;
  pageSize = 20;
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows'] || changes['config'] || changes['pageSizeOptions']) {
      this.refreshData();
    }
  }


  get paginationConfig(): PaginationConfig {
    const total = this.totalRecordsSubject.getValue();
    return {
      totalRecords: total,
      currentPage: this.currentPage,
      totalPages: Math.max(1, Math.ceil(total / this.pageSize)),
      pageSize: this.pageSize,
      pageSizeOptions: this.pageSizeOptions,
      startRecord: this.startRecord,
      endRecord: this.endRecord
    };
  }

  refreshData(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {
    this.fullData = [...this.rows];
    let data = [...this.fullData];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter(row =>
        Object.values(row).some(value => String(value).toLowerCase().includes(term))
      );
    }

    if (sort.active && sort.direction) {
      const dir = sort.direction === 'asc' ? 1 : -1;
      data = data.sort((a, b) => {
        const first = a[sort.active as keyof UserData];
        const second = b[sort.active as keyof UserData];

        if (first == null && second == null) return 0;
        if (first == null) return -1 * dir;
        if (second == null) return 1 * dir;
        if (first < second) return -1 * dir;
        if (first > second) return 1 * dir;
        return 0;
      });
    }

    const start = (page - 1) * size;
    const end = start + size;
    const paginated = data.slice(start, end).map((item, index) => ({
      ...item,
      sl: start + index + 1,
    }));

    this.dataSubject.next(paginated);
    this.totalRecordsSubject.next(data.length);
    this.currentPage = page;
    this.pageSize = size;
    this.currentSearchTerm = searchTerm;
    this.currentSort = sort;
    this.startRecord = data.length === 0 ? 0 : start + 1;
    this.endRecord = Math.min(end, data.length);
  }

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
    this.refreshData(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
    this.refreshData(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.sizeChange.emit(size);
    this.refreshData(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.searchChange.emit(term);
    this.refreshData(1, this.pageSize, term, this.currentSort);
  }
}

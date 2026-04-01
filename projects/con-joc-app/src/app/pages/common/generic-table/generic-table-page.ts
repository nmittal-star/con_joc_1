import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableColumn, TableConfig, UserData } from '@eh-library/common';
import { DIDLogsDataService } from '../../../data-access/logs/did-logs/did-logs.api';
import { GenericTable } from './generic-table';

@Component({
  selector: 'app-generic-table-page',
  standalone: true,
  imports: [GenericTable],
  templateUrl: './generic-table-page.html',
  styleUrl: './generic-table-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericTablePage implements OnInit {
  private route = inject(ActivatedRoute);
  private didLogsDataService = inject(DIDLogsDataService);
  private cdr = inject(ChangeDetectorRef);

  title = 'DID Log Details';
  rows: UserData[] = [];

  tableConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: false,
  };

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'id', label: 'ID', searchable: true },
    { key: 'account', label: 'Account', sortable: true, searchable: true },
    { key: 'did', label: 'DID', sortable: true, searchable: true },
    { key: 'type', label: 'Type', sortable: true, searchable: true },
    { key: 'action', label: 'Action', sortable: true, searchable: true },
    { key: 'destination_account', label: 'Destination Account', sortable: true, searchable: true },
    { key: 'status', label: 'Status', searchable: true },
    { key: 'vendor', label: 'Vendor', sortable: true, searchable: true },
    { key: 'date', label: 'Date', sortable: true, searchable: true },
  ];

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');

    this.didLogsDataService.getDIDLogs().subscribe({
      next: (res: unknown) => {
        if (!Array.isArray(res)) {
          console.error('Expected array but received:', res);
          this.rows = [];
          this.cdr.markForCheck();
          return;
        }

        const matchedRows = routeId
          ? res.filter(row => String((row as Record<string, unknown>)['id']) === String(routeId))
          : [...res];

        if (matchedRows.length > 0) {
          this.rows = matchedRows as UserData[];
          this.cdr.markForCheck();
          return;
        }

        const savedRow = localStorage.getItem('selectedReleaseLog');
        this.rows = savedRow ? [JSON.parse(savedRow)] : [];
        this.cdr.markForCheck();
      },
      error: error => {
        console.error('Failed to load DID log details:', error);
        this.rows = [];
        this.cdr.markForCheck();
      },
    });
  }
}

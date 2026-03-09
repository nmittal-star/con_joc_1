export interface RepCheckCsvFile {
  id: number;
  file_name: string;
  status: 'PROCESSED' | 'PENDING' | 'FAILED';
  mode: 'MIXED' | 'AUTO' | 'MANUAL';
  note?: string | null;
  result?: string | null;
  created_at: string;     
  processed_at?: string | null;
  deleted_at?: string | null;
}
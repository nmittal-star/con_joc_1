export interface MetabaseReportSettings {
  sl:number;
  id: number;
  title: string;
  createdDate: string;       
  publishedDate?: string | null;
  publishedStatus: 'Published' | 'Not Published';
}
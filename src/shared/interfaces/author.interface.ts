export interface Author {
  _id: string;
  firstName: string;
  lastName: string;
  formattedName: string;
  cutter: string;
  photoUrl: string;
}

export interface BulkInsertResponse {
  acknowledged: boolean;
  insertedCount: number;
}

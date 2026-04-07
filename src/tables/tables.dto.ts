export class CreateTableDto {
  number: number;
  seats: number;
  location?: string;
}

export class UpdateTableDto {
  number?: number;
  seats?: number;
  location?: string;
  status?: string;
}

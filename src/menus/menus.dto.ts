export class CreateMenuDto {
  title: string;
  price: number;
  description?: string;
  category?: string;
}

export class UpdateMenuDto {
  title?: string;
  price?: number;
  description?: string;
  category?: string;
}

export class CreateRestaurantDto {
  name: string;
  address: string;
  phone?: string;
  cuisine?: string;
}

export class UpdateRestaurantDto {
  name?: string;
  address?: string;
  phone?: string;
  cuisine?: string;
}

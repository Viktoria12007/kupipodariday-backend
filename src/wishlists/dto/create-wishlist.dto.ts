import { PickType } from "@nestjs/swagger";
import { Wishlist } from "../entities/wishlist.entity";
import { IsArray, IsNumber } from "class-validator";

export class CreateWishlistDto extends PickType(Wishlist, ['name', 'image']) {
  @IsArray()
  @IsNumber({}, { each: true })
  itemsId: Array<number>;
}

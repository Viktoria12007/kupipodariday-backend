import { PickType } from "@nestjs/swagger";
import { Wish } from "../entities/wish.entity";

export class ChangedRaisedDto extends PickType(Wish, ['raised']) {}

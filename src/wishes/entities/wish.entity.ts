import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { IsInt, IsNumber, IsString, IsUrl, Length } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { Offer } from "../../offers/entities/offer.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Wishlist } from "../../wishlists/entities/wishlist.entity";

@Entity()
export class Wish {
    @ApiProperty({ description: 'id подарка' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'дата создания подарка' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'дата обновления подарка' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ description: 'имя подарка', example: 'Имя подарка' })
    @Column()
    @Length(1, 250)
    name: string;

    @ApiProperty({ description: 'ссылка на интернет-магазин, в котором можно приобрести подарок', example: 'https://img.freepik.com/premium-photo/medium-shot-woman-living-farmhouse_23-2150621719.jpg' })
    @Column()
    @IsUrl()
    link: string;

    @ApiProperty({ description: 'ссылка на изображение подарка', example: 'https://img.freepik.com/premium-photo/squirrel-sitting-tree-branch_1048944-30371835.jpg' })
    @Column()
    @IsUrl()
    image: string;

    @ApiProperty({ description: 'стоимость подарка', example: 2000 })
    @Column({
        type: "money",
    })
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    price: number;

    @ApiProperty({ description: 'сумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок', example: 500 })
    @Column({
        type: "money",
    })
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    raised: number;

    @ApiProperty({ description: 'описание подарка', example: 'Описание подарка' })
    @Column()
    @IsString()
    @Length(1, 1024)
    description: string;

    @ApiProperty({ description: 'cчётчик тех, кто скопировал подарок себе', example: 0 })
    @Column({
        type: "integer",
    })
    @IsInt()
    copied: number;
}

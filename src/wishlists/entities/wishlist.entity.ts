import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { IsString, IsUrl, Length } from "class-validator";
import { Wish } from "../../wishes/entities/wish.entity";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Wishlist {
    @ApiProperty({ description: 'id списка подарков' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'дата создания списка подарков' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'дата обновления списка подарков' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ description: 'имя списка подарков', example: 'Имя списка подарков' })
    @Column()
    @IsString()
    @Length(1, 250)
    name: string;

    @ApiProperty({ description: 'описание списка подарков', example: 'Описание списка подарков' })
    @Column()
    @IsString()
    @Length(0, 1500)
    description: string;

    @ApiProperty({ description: 'обложка списка подарков', example: 'https://img.freepik.com/free-photo/beautiful-landscape-mother-nature_23-2148992406.jpg?t=st=1749468868~exp=1749472468~hmac=5f594a04a21d8e89a0d946f462d230d4e8749da39fd4bbc3c99fa92edb5ab3ac' })
    @Column()
    @IsString()
    @IsUrl()
    image: string;

    @ManyToOne(() => User, (user) => user.wishlists)
    owner: User;

    @JoinTable()
    items: Wish[];
}

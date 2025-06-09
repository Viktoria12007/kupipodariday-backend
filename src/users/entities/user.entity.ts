import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { Wish } from "../../wishes/entities/wish.entity";
import { Wishlist } from "../../wishlists/entities/wishlist.entity";
import { Offer } from "../../offers/entities/offer.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({ description: 'id пользователя' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'дата создания пользователя' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'дата обновления пользователя' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ description: 'Имя пользователя', example: 'Пользователь 1' })
    @IsString()
    @Length(2, 30)
    @Column({
        unique: true,
    })
    username: string;

    @ApiProperty({ description: 'Описание пользователя', example: 'О пользователе 1' })
    @IsString()
    @Length(2, 200)
    @IsOptional()
    @Column({
        default: 'Пока ничего не рассказал о себе'
    })
    about: string;

    @ApiProperty({ description: 'Аватар пользователя', example: 'https://i.pravatar.cc/300' })
    @IsUrl()
    @IsOptional()
    @Column({
        default: 'https://i.pravatar.cc/300'
    })
    avatar: string;

    @ApiProperty({ description: 'Email пользователя', example: 'admin@gmail.com' })
    @IsEmail()
    @Column({
        unique: true,
        select: false,
    })
    email: string;

    @ApiProperty({ description: 'Пароль пользователя', example: '123456789' })
    @IsString()
    @Column({ select: false })
    password: string;

    @OneToMany(() => Wish, wish => wish.owner, {
        cascade: true,
    })
    wishes: Wish[];

    @OneToMany(() => Offer, offer => offer.user, {
        cascade: true,
    })
    offers: Offer[];

    @OneToMany(() => Wishlist, wishlist => wishlist.owner, {
        cascade: true,
    })
    wishlists: Wishlist[];
}

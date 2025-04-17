import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { IsDefined, IsEmail, IsString, IsUrl, Length } from "class-validator";
import {Wish} from "../../wishes/entities/wish.entity";
import {Wishlist} from "../../wishlists/entities/wishlist.entity";
import {Offer} from "../../offers/entities/offer.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        unique: true,
    })
    @IsString()
    @Length(2, 30)
    @IsDefined()
    username: string;

    @Column({
        default: 'Пока ничего не рассказал о себе'
    })
    @IsString()
    @Length(2, 200)
    about: string;

    @Column({
        default: 'https://i.pravatar.cc/300'
    })
    @IsUrl()
    avatar: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Wish, wish => wish.owner)
    wishes: Wish[];

    @OneToMany(() => Offer, offer => offer.user)
    offers: Offer[];

    @OneToMany(() => Wishlist, wishlist => wishlist.owner)
    wishlists: Wishlist[];
}

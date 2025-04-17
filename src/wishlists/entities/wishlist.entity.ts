import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsString, IsUrl, Length} from "class-validator";
import {Wish} from "../../wishes/entities/wish.entity";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @IsString()
    @Length(1, 250)
    name: string;

    @Column()
    @IsString()
    @Length(0, 1500)
    description: string;

    @Column()
    @IsString()
    @IsUrl()
    image: string;

    @OneToMany(() => Wish, wish => wish.id)
    items: Wish[];
}

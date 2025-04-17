import {Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsNumber} from "class-validator";
import {User} from "../../users/entities/user.entity";
import {Wish} from "../../wishes/entities/wish.entity";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.offers)
    user: User;

    @ManyToOne(() => Wish, wish => wish.offers)
    item: Wish;

    @Column({
        type: "money",
    })
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    amount: number;

    @Column({
        default: false,
    })
    hidden: boolean;
}

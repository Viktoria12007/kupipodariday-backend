import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {IsInt, IsNumber, IsString, IsUrl, Length} from "class-validator";
import {User} from "../../users/entities/user.entity";
import {Offer} from "../../offers/entities/offer.entity";

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @Length(1, 250)
    name: string;

    @Column()
    @IsUrl()
    link: string;

    @Column()
    @IsUrl()
    image: string;

    @Column({
        type: "money",
    })
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    price: number;

    @Column({
        type: "money",
    })
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    raised: number;

    @ManyToOne(() => User, user => user.wishes)
    owner: User;

    @Column()
    @IsString()
    @Length(1, 1024)
    description: string;

    @OneToMany(() => Offer, offer => offer.item)
    offers: Offer[];

    @Column({
        type: "integer",
    })
    @IsInt()
    copied: number;
}

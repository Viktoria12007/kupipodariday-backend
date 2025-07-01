import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNumber } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { Wish } from "../../wishes/entities/wish.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Offer {
    @ApiProperty({ description: 'id предложения скинуться' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'дата создания предложения скинуться' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'дата обновления предложения скинуться' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ description: 'сумма заявки', example: 5000 })
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    @Column({
        type: "decimal",
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
    })
    amount: number;

    @ApiProperty({ description: 'флаг, который определяет показывать ли информацию о скидывающемся в списке', example: false })
    @Column({
        default: false,
    })
    hidden: boolean;

    @ManyToOne(() => User, user => user.offers, {
        onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne(() => Wish, wish => wish.offers, {
        onDelete: 'CASCADE',
    })
    item: Wish;
}

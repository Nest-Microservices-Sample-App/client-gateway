import { Type } from "class-transformer";
import { IsPositive, IsNumber, IsOptional, IsEnum, IsBoolean } from "class-validator";
import { OrderStatus } from "../enums";

export class CreateOrderDto {

    @IsPositive()
    @IsNumber()
    @Type(() => Number)
    totalAmount: number;

    @IsPositive()
    @IsNumber()
    @Type(() => Number)
    totalItems: number;

    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `Possible status values are: ${OrderStatus}`
    })
    status: OrderStatus = OrderStatus.PENDING;

    @IsOptional()
    @IsBoolean()
    paid: boolean = false;

}

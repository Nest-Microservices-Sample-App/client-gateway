import { IsEnum, IsOptional } from "class-validator";
import { extend } from "joi";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enums";


export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Possible status values are: ${OrderStatusList}`
    })
    status?: OrderStatus;
}
import { IsEnum, IsString, IsUUID } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enums";

export class UpdateOrderDto {

    @IsUUID()
    @IsString()
    id: string;

    @IsEnum(OrderStatusList, {
        message: `Possible status values are: ${OrderStatusList}`
    })
    status: OrderStatus;
}

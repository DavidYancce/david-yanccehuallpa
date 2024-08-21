import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsInt()
  vendedorId: number;

  @IsNotEmpty()
  @IsInt()
  estadoId: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  productos: PedidoProductoDto[];
}

export class PedidoProductoDto {
  @IsNotEmpty()
  @IsInt()
  productoId: number;

  @IsNotEmpty()
  @IsInt()
  cantidad: number;
}

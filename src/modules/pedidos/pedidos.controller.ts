import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
@ApiTags('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async createPedido(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Patch(':id/estado')
  async changeEstado(
    @Param('id') id: number,
    @Body('nuevoEstadoId') nuevoEstadoId: number,
  ) {
    return this.pedidosService.changeEstadoPedido(id, nuevoEstadoId);
  }
}

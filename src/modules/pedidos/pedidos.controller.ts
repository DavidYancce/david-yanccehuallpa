import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
@ApiTags('pedidos')
@ApiBearerAuth()
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPedido(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Patch(':id/estado')
  @UseGuards(JwtAuthGuard)
  async changeEstado(
    @Param('id') id: number,
    @Body('nuevoEstadoId') nuevoEstadoId: number,
  ) {
    return this.pedidosService.changeEstadoPedido(id, nuevoEstadoId);
  }
}

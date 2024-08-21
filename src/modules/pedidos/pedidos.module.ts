import { Module } from '@nestjs/common';
import { PrismaService } from '../../providers/db/prisma.provider';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService, PrismaService],
})
export class PedidosModule {}

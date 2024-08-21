import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PedidosStates } from '../../enums/pedidos-states.enum';
import { PrismaService } from '../../providers/db/prisma.provider';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const { vendedorId, estadoId, productos } = createPedidoDto;
    const nroPedidoGenerated = `PED-${Date.now()}`;

    return this.prisma.pedido.create({
      data: {
        nroPedido: nroPedidoGenerated,
        fechaPedido: new Date(),
        vendedor: { connect: { id: vendedorId } },
        estado: { connect: { id: estadoId } },
        productos: {
          create: productos.map((producto) => ({
            productoId: producto.productoId,
            cantidad: producto.cantidad,
          })),
        },
      },
      include: {
        productos: true,
      },
    });
  }

  async changeEstadoPedido(pedidoId: number, nuevoEstadoId: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id: pedidoId },
      include: { estado: true },
    });

    if (!pedido) {
      throw new BadRequestException('Pedido no encontrado');
    }

    const esCambioValido = this.validarCambioEstado(
      pedido.estado.id,
      nuevoEstadoId,
    );
    if (!esCambioValido) {
      throw new BadRequestException('Cambio de estado no permitido');
    }

    let fechaActualizacion: Partial<Prisma.PedidoUpdateInput> = {};
    switch (nuevoEstadoId) {
      case PedidosStates.POR_ATENDER:
        fechaActualizacion = { fechaPedido: new Date() };
        break;
      case PedidosStates.EN_PROCESO:
        fechaActualizacion = { fechaRecepcion: new Date() };
        break;
      case PedidosStates.DELIVERY:
        fechaActualizacion = { fechaDespacho: new Date() };
        break;
      case PedidosStates.RECIBIDO:
        fechaActualizacion = { fechaEntrega: new Date() };
        break;
      default:
        throw new BadRequestException('Estado no válido');
    }

    return this.prisma.pedido.update({
      where: { id: pedidoId },
      data: {
        estado: { connect: { id: nuevoEstadoId } },
        ...fechaActualizacion,
      },
      include: { estado: true },
    });
  }

  private validarCambioEstado(
    estadoActualId: number,
    nuevoEstadoId: number,
  ): boolean {
    const jerarquiaEstados = {
      1: [2, 3, 4],
      2: [3, 4],
      3: [4],
      4: [],
    };

    return jerarquiaEstados[estadoActualId]?.includes(nuevoEstadoId) || false;
  }
}

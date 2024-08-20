import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../providers/db/prisma.provider';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.usuario.create({
      data: {
        codigoTrabajador: createUserDto.codigoTrabajador,
        nombre: createUserDto.nombre,
        correoElectronico: createUserDto.correoElectronico,
        telefono: createUserDto.telefono,
        puesto: createUserDto.puesto,
        rolId: createUserDto.rolId,
        password: hashedPassword,
      },
    });
    return { ...user, password: undefined };
  }

  async findOneByEmail(correoElectronico: string) {
    return this.prisma.usuario.findFirst({
      where: { correoElectronico: correoElectronico },
    });
  }
}

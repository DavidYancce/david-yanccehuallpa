import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@Module({
  imports: [AuthModule, UsuariosModule, PedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

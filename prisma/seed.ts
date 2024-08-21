import { PrismaClient } from '@prisma/client';
import { PedidosStates } from '../src/enums/pedidos-states.enum';
import { UserRoles } from '../src/enums/user-roles.enum';
const prisma = new PrismaClient();

const roles = [
  [UserRoles.ENCARGADO, 'Encargado'],
  [UserRoles.VENDEDOR, 'Vendedor'],
  [UserRoles.DELIVERY, 'Delivery'],
  [UserRoles.REPARTIDOR, 'Repartidor'],
];

const estadosPedidos = [
  [PedidosStates.POR_ATENDER, 'Por atender'],
  [PedidosStates.EN_PROCESO, 'En proceso'],
  [PedidosStates.DELIVERY, 'En delivery'],
  [PedidosStates.RECIBIDO, 'Recibido'],
];

const seedRoles = async () => {
  const raw = [
    'SET IDENTITY_INSERT roles ON',
    ...roles.map(
      ([id, nombre]) => `
        IF NOT EXISTS (SELECT 1 FROM roles WHERE id = ${id})
        BEGIN
          INSERT INTO roles (id, nombre)
          VALUES (${id}, N'${nombre}')
        END`,
    ),
    'SET IDENTITY_INSERT roles OFF',
  ].join('\n');

  await prisma.$executeRawUnsafe(raw);
};

const seedEstadosPedidos = async () => {
  const raw = [
    'SET IDENTITY_INSERT estados ON',
    ...estadosPedidos.map(
      ([id, nombre]) => `
        IF NOT EXISTS (SELECT 1 FROM estados WHERE id = ${id})
        BEGIN
          INSERT INTO estados (id, nombre)
          VALUES (${id}, N'${nombre}')
        END`,
    ),
    'SET IDENTITY_INSERT estados OFF',
  ].join('\n');

  await prisma.$executeRawUnsafe(raw);
};

seedRoles()
  .then(async () => {
    await seedEstadosPedidos();
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

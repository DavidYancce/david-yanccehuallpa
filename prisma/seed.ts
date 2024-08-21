import { PrismaClient } from '@prisma/client';
import { UserRoles } from '../src/enums/user-roles.enum';
const prisma = new PrismaClient();

const roles = [
  [UserRoles.ENCARGADO, 'Encargado'],
  [UserRoles.VENDEDOR, 'Vendedor'],
  [UserRoles.DELIVERY, 'Delivery'],
  [UserRoles.REPARTIDOR, 'Repartidor'],
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

seedRoles()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

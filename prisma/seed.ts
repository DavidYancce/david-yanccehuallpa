import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const rol = await prisma.rol.findUnique({
    where: {
      id: 1,
    },
  });

  if (rol) return;
  await prisma.rol.create({
    data: {
      nombre: 'Administrador',
      id: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const { PrismaClient } = require("@prisma/client");
const { RoleSeeder, UserSeeder } = require("./databaseSeeder");

const prisma = new PrismaClient();

const main = async () => {
  const seededRole = await prisma.role.create({
    data: RoleSeeder,
  });

  const adminUserSeedData = { ...UserSeeder, roleName: seededRole.name };
  await prisma.users.create({
    data: adminUserSeedData,
  });
};

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

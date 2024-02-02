const { hashedPassword } = require("../src/helpers");

const RoleSeeder = {
  name: "Super Admin",
  permission: JSON.stringify([
    {
      title: "dashboard",
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  ]),
};

const UserSeeder = {
  fullName: "Super Admin",
  userName: "Super Admin",
  email: "super_admin@admin.com",
  password: hashedPassword("password"),
  mobileNumber: "09123456789",
};

module.exports = { UserSeeder: UserSeeder, RoleSeeder: RoleSeeder };

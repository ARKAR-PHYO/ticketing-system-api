const { hashedPassword } = require("../src/helpers");

const UserSeeder = {
  fullName: "Super Admin",
  userName: "Super Admin",
  email: "super_admin@admin.com",
  password: hashedPassword("password"),
  mobileNumber: "09123456789",
};

module.exports = { UserSeeder: UserSeeder };

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
    {
      title: "user management",
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    {
      title: "role permission management",
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    {
      title: "project management",
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    {
      title: "ticket management",
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

const Projects = [
  {
    name: "Interview Process",
    description: "Project for interview process",
  },
  {
    name: "Recruit Process",
    description: "Project for recruit process",
  },
];

module.exports = {
  UserSeeder: UserSeeder,
  RoleSeeder: RoleSeeder,
  ProjectsSeeder: Projects,
};

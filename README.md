## Ticketing System API by Arkar Phyo

clone repository

```bash
git clone https://github.com/ARKAR-PHYO/ticketing-system-api.git
```

```bash
cd ticketing-system-api
```

Install dependencies

```bash
yarn
or
npm install
```

---

### Setup env variables

Copy .env.example

```bash
cp .env.example .env
```

💡 For SECURITY REASON, I've included the actual env file by GoogleDrive. It contains MongoDB Cluster and Firebase related keys.

Prisma migrate

```bash
yarn prisma db push
or
npx prisma db push
or
bun prisma db push
```

Database seeding

```bash
yarn prisma db seed
or
npx prisma db push
or
bun prisma db push
```

💡 After seeding the database, 1 User, 1 Role with Permission and 2 Projects by default. I will explain details on [client documentation](https://github.com/ARKAR-PHYO/ticketing-system-panel/blob/783f6c88542cfd06cc37a00aca9be8728494dae7/README.md).

---

### Run development

```bash
yarn run dev:watch:yarn
or
npm run dev:watch:npm
or
bun run dev:watch:bun
```

### ðŸ‘ðŸ» voilÃ !! you are now complete setup for this API and ready to build up some amazing things. The last but not the least let's jump to [client setup](https://github.com/ARKAR-PHYO/ticketing-system-panel/blob/783f6c88542cfd06cc37a00aca9be8728494dae7/README.md).

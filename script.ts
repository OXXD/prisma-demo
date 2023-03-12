import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  console.log("createUser: \n", user);
}

async function findAllUsers() {
  const users = await prisma.user.findMany();
  console.log("findAllUsers: \n", users);
}

async function createUserWithRelation() {
  const user = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
      posts: {
        create: {
          title: "Hello World",
        },
      },
    },
  });
  console.log("createUserWithRelation: \n", user);
}

async function findUserWithRelation() {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("findUserWithRelation: \n");
  console.dir(usersWithPosts, { depth: null });
}

async function main() {
  await createUser();
  await findAllUsers();
  await createUserWithRelation();
  await findUserWithRelation();
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

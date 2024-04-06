import { prisma } from "../src/server/db/client";
import { faker } from "@faker-js/faker";
import { type Role, Verification } from "@prisma/client";
import { ListPPICabang, germanCities } from "../src/Components/optionsList";

async function generateUserData() {
  const users = [];
  const occupations = [
    "bachelor",
    "master",
    "ausbildung",
    "doctor",
    "professor",
  ];

  for (let i = 0; i < 1500; i++) {
    const randomIndex = faker.number.int({
      min: 0,
      max: germanCities.length - 1,
    });
    const selectedCity = germanCities[randomIndex];

    const randomIndexCabang = faker.number.int({
      min: 0,
      max: ListPPICabang.length - 1,
    });

    const selectedPPICabang = ListPPICabang[randomIndexCabang];

    console.log("selectedCity", selectedCity);
    console.log("selectedPPICabang", selectedPPICabang);

    const user = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
      image: faker.image.avatar(),
      role: "USER" as Role,
      verification: faker.helpers.arrayElement(Object.values(Verification)),
      ppicabang: selectedPPICabang!.value,
      birthDate: faker.date.past(),
      occupation: faker.helpers.arrayElement(occupations),
      fieldOfStudy: faker.person.jobTitle(),
      studySpecialization: faker.person.jobDescriptor(),
      location: selectedCity!.name,
      bundesland: selectedCity!.bundesland,
      expectedGraduation: faker.date.future(),
      universityName: faker.company.name(),
      universityEmail: faker.internet.email(),
      forwardDataThirdParty: faker.datatype.boolean(),
      subscribeNewsletterEmail: faker.datatype.boolean(),
      agreedToTermsAndCond: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),

      // More fields as per your schema can be added here
    };

    users.push(user);
  }

  return users;
}

async function main() {
  const usersToInsert = await generateUserData();
  try {
    for (const user of usersToInsert) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
    }
    console.log("Users successfully inserted!");
  } catch (error) {
    console.error("Error inserting users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

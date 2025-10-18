import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create some initial concepts
  const shipOfTheseus = await prisma.concept.create({
    data: {
      title: 'Ship of Theseus',
      description:
        'A thought experiment about whether an object that has had all of its components replaced remains fundamentally the same object.',
      type: 'theory',
      createdBy: 'Plutarch',
    },
  });

  const identity = await prisma.concept.create({
    data: {
      title: 'Identity',
      description: 'The quality or condition of being the same.',
      type: 'term',
      createdBy: 'anonymous',
    },
  });

  const change = await prisma.concept.create({
    data: {
      title: 'Change',
      description: 'The act or instance of making or becoming different.',
      type: 'term',
      createdBy: 'anonymous',
    },
  });

  const heraclitus = await prisma.concept.create({
    data: {
      title: 'You cannot step into the same river twice',
      description:
        'A quote by Heraclitus suggesting that everything is in constant flux.',
      type: 'quote',
      createdBy: 'Heraclitus',
    },
  });

  const emergence = await prisma.concept.create({
    data: {
      title: 'Emergence',
      description:
        'The whole is more than the sum of its parts - complex systems show properties not present in individual components.',
      type: 'theory',
      createdBy: 'anonymous',
    },
  });

  const consciousness = await prisma.concept.create({
    data: {
      title: 'Consciousness',
      description: 'The state of being aware of and responsive to surroundings.',
      type: 'term',
      createdBy: 'anonymous',
    },
  });

  const whatIsReality = await prisma.concept.create({
    data: {
      title: 'What is reality?',
      description: 'Fundamental question about the nature of existence.',
      type: 'question',
      createdBy: 'anonymous',
    },
  });

  // Create relationships
  await prisma.relationship.create({
    data: {
      sourceConceptId: shipOfTheseus.id,
      targetConceptId: identity.id,
      relationshipType: 'questions',
      description: 'The paradox questions the nature of identity over time',
      createdBy: 'anonymous',
    },
  });

  await prisma.relationship.create({
    data: {
      sourceConceptId: shipOfTheseus.id,
      targetConceptId: change.id,
      relationshipType: 'explores',
      description: 'Examines how change affects identity',
      createdBy: 'anonymous',
    },
  });

  await prisma.relationship.create({
    data: {
      sourceConceptId: heraclitus.id,
      targetConceptId: change.id,
      relationshipType: 'supports',
      description: 'Both emphasize the constant nature of change',
      createdBy: 'anonymous',
    },
  });

  await prisma.relationship.create({
    data: {
      sourceConceptId: heraclitus.id,
      targetConceptId: shipOfTheseus.id,
      relationshipType: 'related_to',
      description: 'Both deal with identity through change',
      createdBy: 'anonymous',
    },
  });

  await prisma.relationship.create({
    data: {
      sourceConceptId: emergence.id,
      targetConceptId: consciousness.id,
      relationshipType: 'explains',
      description: 'Consciousness may be an emergent property',
      createdBy: 'anonymous',
    },
  });

  await prisma.relationship.create({
    data: {
      sourceConceptId: consciousness.id,
      targetConceptId: whatIsReality.id,
      relationshipType: 'related_to',
      description: 'Consciousness shapes our perception of reality',
      createdBy: 'anonymous',
    },
  });

  await prisma.relationship.create({
    data: {
      sourceConceptId: identity.id,
      targetConceptId: consciousness.id,
      relationshipType: 'related_to',
      description: 'Identity is closely tied to consciousness',
      createdBy: 'anonymous',
    },
  });

  console.log('✓ Database seeded successfully!');
  console.log(`Created ${7} concepts and ${7} relationships`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

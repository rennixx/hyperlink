import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting database...');

  // Delete all relationships first (foreign key constraint)
  await prisma.relationship.deleteMany({});
  console.log('✓ Deleted all relationships');

  // Delete all concepts
  await prisma.concept.deleteMany({});
  console.log('✓ Deleted all concepts');

  // Create the single starting concept
  const whatIsReality = await prisma.concept.create({
    data: {
      title: 'What is reality?',
      description: 'The fundamental question about the nature of existence.',
      type: 'question',
      createdBy: 'Hyperlink',
    },
  });

  console.log('✓ Created starting concept: "What is reality?"');
  console.log('\n🌐 Database reset complete!');
  console.log('The knowledge graph now begins with a single question.');
  console.log('Start building the collective mind by adding your first concept!');
}

main()
  .catch((e) => {
    console.error('Error resetting database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Categories with their typical amount ranges
const CATEGORIES = {
    INCOME: [
        { name: "salary", range: [5000, 8000] },
        { name: "freelance", range: [1000, 3000] },
        { name: "investments", range: [500, 2000] },
        { name: "other-income", range: [100, 1000] },
    ],
    EXPENSE: [
        { name: "housing", range: [1000, 2000] },
        { name: "transportation", range: [100, 500] },
        { name: "groceries", range: [200, 600] },
        { name: "utilities", range: [100, 300] },
        { name: "entertainment", range: [50, 200] },
        { name: "food", range: [50, 150] },
        { name: "shopping", range: [100, 500] },
        { name: "healthcare", range: [100, 1000] },
        { name: "education", range: [200, 1000] },
        { name: "travel", range: [500, 2000] },
    ],
};

// Helper to generate random amount within a range
function getRandomAmount(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to get random category with amount
function getRandomCategory(type) {
    const categories = CATEGORIES[type];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = getRandomAmount(category.range[0], category.range[1]);
    return { category: category.name, amount };
}

async function seed() {
    try {
        console.log('🌱 Starting seed process...');

        // Get the first user's default account (you can modify this to target specific user)
        const account = await prisma.account.findFirst({
            where: {
                isDefault: true,
            },
            include: {
                user: true,
            },
        });

        if (!account) {
            throw new Error('No default account found. Please create an account first.');
        }

        console.log(`📦 Found account: ${account.name} (User: ${account.user.email})`);

        // Generate transactions from Jan 1, 2024 to October 31, 2024
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-10-31');
        const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

        const transactions = [];
        let totalBalance = 0;

        console.log(`📅 Generating transactions from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
        console.log(`📊 This will cover ${daysDiff + 1} days`);

        for (let i = 0; i <= daysDiff; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);

            // Generate 1-3 transactions per day to cover all months properly
            const transPerDay = Math.floor(Math.random() * 3) + 1;

            for (let j = 0; j < transPerDay; j++) {
                // 40% chance of income, 60% chance of expense
                const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
                const { category, amount } = getRandomCategory(type);

                const transaction = {
                    type,
                    amount,
                    description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
                    date,
                    category,
                    status: "COMPLETED",
                    userId: account.userId,
                    accountId: account.id,
                    createdAt: date,
                    updatedAt: date,
                };

                totalBalance += type === "INCOME" ? amount : -amount;
                transactions.push(transaction);
            }
        }

        console.log(`💾 Inserting ${transactions.length} transactions...`);

        // Insert transactions in batches and update account balance
        await prisma.$transaction(async (tx) => {
            // Clear existing transactions for this account
            const deleted = await tx.transaction.deleteMany({
                where: { accountId: account.id },
            });
            console.log(`🗑️  Deleted ${deleted.count} existing transactions`);

            // Insert new transactions
            await tx.transaction.createMany({
                data: transactions,
            });

            // Update account balance
            await tx.account.update({
                where: { id: account.id },
                data: { balance: totalBalance },
            });

            console.log(`💰 Updated account balance to $${totalBalance.toFixed(2)}`);
        });

        console.log('✅ Seed completed successfully!');
        console.log(`📊 Created ${transactions.length} transactions`);
    } catch (error) {
        console.error('❌ Error seeding transactions:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seed();

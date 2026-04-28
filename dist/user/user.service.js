"use strict";
async;
createAdmin();
{
    const admin = await this.userRepo.findOne({
        where: { email: 'admin@restaurant.com' },
    });
    if (!admin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await this.userRepo.save({
            name: 'Admin',
            email: 'admin@restaurant.com',
            password: hashedPassword,
            role: UserRole.ADMIN,
        });
    }
}

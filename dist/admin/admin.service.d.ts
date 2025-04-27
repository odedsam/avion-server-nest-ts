import { AdminRepository } from './admin.repository';
export declare class AdminService {
    private readonly adminRepository;
    private readonly logger;
    constructor(adminRepository: AdminRepository);
    migrateProductImageUrls(): Promise<{
        modifiedCount: number;
    }>;
    removeProductField(fieldName: string): Promise<{
        modifiedCount: number;
    }>;
}

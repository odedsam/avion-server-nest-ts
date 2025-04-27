import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    private readonly logger;
    constructor(adminService: AdminService);
    migrateProductImages(): Promise<{
        message: string;
        modifiedCount: number;
    }>;
    removeProductField(body: {
        fieldName: string;
    }): Promise<{
        message: string;
        modifiedCount: number;
    }>;
    hello(): Promise<{
        message: string;
    }>;
}

// import { Injectable, Logger } from '@nestjs/common';
// import { AdminRepository } from './admin.repository';
// import { extractImagePath } from 'src/utils/imageMigration';

// @Injectable()
// export class AdminService {
//   private readonly logger = new Logger(AdminService.name);

//   constructor(private readonly adminRepository: AdminRepository) {}

//   /**
//    * Migrates image URLs in the Product collection, removing the Supabase base URL.
//    */
//   async migrateProductImageUrls(): Promise<{ modifiedCount: number }> {
//     this.logger.log('Initiating product image URL migration (Admin Service using Repository)...');
//     const supabaseBaseUrlRegex = /^https:\/\/[\w-]+\.supabase\.co\/storage\/v1\/object\/public\/[\w-]+/;

//     try {
//       const productsToUpdate = await this.adminRepository.findAllProducts();
//       let modifiedCount = 0;

//       for (const product of productsToUpdate) {
//         if (product.productImage && supabaseBaseUrlRegex.test(product.productImage)) {
//           const extractedPath = extractImagePath(product.productImage);
//           if (extractedPath) {
//             await this.adminRepository.updateManyProducts(
//               { _id: product._id },
//               { $set: { imageUrl: extractedPath } },
//             );
//             modifiedCount++;
//           }
//         }
//       }

//       this.logger.log(`Successfully migrated ${modifiedCount} image URLs (Admin Service using Repository).`);
//       return { modifiedCount };

//     } catch (error) {
//       this.logger.error('Error during product image URL migration (Admin Service using Repository):', error);
//       throw error;
//     }
//   }

//   /**
//    * Removes a specific field from all Product documents (Admin Service using Repository).
//    * @param fieldName The name of the field to remove.
//    */
//   async removeProductField(fieldName: string): Promise<{ modifiedCount: number }> {
//     this.logger.log(`Initiating removal of field "${fieldName}" from Products (Admin Service using Repository)...`);
//     try {
//       const result = await this.adminRepository.updateManyProducts(
//         {},
//         { $unset: { [fieldName]: 1 } },
//       );
//       this.logger.log(`Successfully removed field "${fieldName}" from ${result.modifiedCount} Products (Admin Service using Repository).`);
//       return { modifiedCount: result.modifiedCount };
//     } catch (error) {
//       this.logger.error(`Error during removal of field "${fieldName}" (Admin Service using Repository):`, error);
//       throw error;
//     }
//   }

//   // Add other admin-related utility functions below this line
// }

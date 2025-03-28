import { ceramics } from './ceramics';
import { chairs } from './chairs';
import { lights } from './lights';
import { plants } from './plants';
import { tables } from './tables';

export const AllProducts = [ceramics, chairs, lights, plants, tables];

export const categories = {
  ceramics,
  plants,
  lights,
  tables,
  chairs,
};

// export const categories = {
//   ceramics: {
//     products: ceramics,
//     filters: {
//       color: ["red", "blue", "green"],
//       brand: ["Ikea", "Crate & Barrel"],
//       material: ["ceramic", "porcelain"],
//       priceRange: [50, 500],
//     },
//   },
//   chairs: {
//     products: chairs,
//     filters: {
//       brand: ["Herman Miller", "Ikea"],
//       material: ["wood", "metal", "plastic"],
//       priceRange: [100, 1000],
//     },
//   },
//   lights: {
//     products: lights,
//     filters: {
//       color: ["white", "yellow", "blue"],
//       brand: ["Philips", "Ikea"],
//       type: ["table", "ceiling", "floor"],
//       priceRange: [30, 300],
//     },
//   },
//   plants: {
//     products: plants,
//     filters: {
//       type: ["indoor", "outdoor"],
//       size: ["small", "medium", "large"],
//       priceRange: [10, 100],
//     },
//   },
//   tables: {
//     products: tables,
//     filters: {
//       material: ["wood", "glass", "metal"],
//       brand: ["Wayfair", "Ikea"],
//       priceRange: [150, 1500],
//     },
//   },
// };

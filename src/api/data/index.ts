export * from './lights';
export * from './tables';
export * from './chairs';
export * from './plants';
export * from './ceramics';
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

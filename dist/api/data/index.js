"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = exports.AllProducts = void 0;
__exportStar(require("./lights"), exports);
__exportStar(require("./tables"), exports);
__exportStar(require("./chairs"), exports);
__exportStar(require("./plants"), exports);
__exportStar(require("./ceramics"), exports);
const ceramics_1 = require("./ceramics");
const chairs_1 = require("./chairs");
const lights_1 = require("./lights");
const plants_1 = require("./plants");
const tables_1 = require("./tables");
exports.AllProducts = [ceramics_1.ceramics, chairs_1.chairs, lights_1.lights, plants_1.plants, tables_1.tables];
exports.categories = {
    ceramics: ceramics_1.ceramics,
    plants: plants_1.plants,
    lights: lights_1.lights,
    tables: tables_1.tables,
    chairs: chairs_1.chairs,
};
//# sourceMappingURL=index.js.map
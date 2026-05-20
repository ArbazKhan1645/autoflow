import type { ProductCategory } from "@/models";

export interface CatalogCategory {
  name: ProductCategory;
  description: string;
  subCategories: string[];
}

export const catalogCategories: CatalogCategory[] = [
  {
    name: "Engine",
    description: "Performance and replacement engine components.",
    subCategories: ["Air Intake", "Cooling", "Filters", "Fuel Systems"],
  },
  {
    name: "Braking",
    description: "Pads, rotors, calipers and hydraulic systems.",
    subCategories: ["Brake Pads", "Rotors", "Calipers", "Sensors"],
  },
  {
    name: "Suspension",
    description: "Ride control, steering and handling components.",
    subCategories: ["Struts", "Control Arms", "Bushings", "Steering"],
  },
  {
    name: "Electrical",
    description: "Power, charging, sensors and diagnostics.",
    subCategories: ["Batteries", "Alternators", "Sensors", "Modules"],
  },
  {
    name: "Lighting",
    description: "OEM and premium lighting assemblies.",
    subCategories: ["Headlamps", "Tail Lamps", "Fog Lamps", "LED Kits"],
  },
  {
    name: "Body",
    description: "Exterior panels, mirrors and protection parts.",
    subCategories: ["Mirrors", "Bumpers", "Fenders", "Trim"],
  },
  {
    name: "Service",
    description: "Fast-moving service and maintenance items.",
    subCategories: ["Oil", "Wipers", "Belts", "Fluids"],
  },
  {
    name: "Performance",
    description: "Upgrades for enthusiast and fleet buyers.",
    subCategories: ["Exhaust", "Tuning", "Suspension Kits", "Cooling"],
  },
];

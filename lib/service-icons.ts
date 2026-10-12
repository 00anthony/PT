import type { ComponentType } from "react";
import { HousePlus, BrickWallShield, Paintbrush, TreePalm, Grid2X2, Sofa, Building2 } from "lucide-react";

export const serviceIcons: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  roofing: HousePlus,
  siding: BrickWallShield,
  painting: Paintbrush,
  patios: TreePalm,
  windows: Grid2X2,
  foundation: Building2,
  interior: Sofa,
};

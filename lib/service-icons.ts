import type { ComponentType } from "react";
import { HousePlus, BrickWallShield, Paintbrush, TreePalm, Grid2X2, Sofa } from "lucide-react";

export const serviceIcons: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  roofing: HousePlus,
  siding: BrickWallShield,
  painting: Paintbrush,
  patios: TreePalm,
  windows: Grid2X2,
  interior: Sofa,
};

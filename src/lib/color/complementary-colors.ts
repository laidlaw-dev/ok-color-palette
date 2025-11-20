import { OkColor } from './ok-color';

export interface ComplementaryColors {
  complementary: OkColor[];
  splitComplements: OkColor[];
  triadic: OkColor[];
  analogous: OkColor[];
}

export const generateComplementaryColors = (
  baseColor: OkColor
): ComplementaryColors => {
  const complementary = [baseColor.rotateHue(180)];

  const splitComplements = [baseColor.rotateHue(150), baseColor.rotateHue(210)];

  const triadic = [baseColor.rotateHue(120), baseColor.rotateHue(240)];

  const analogous = [
    baseColor.rotateHue(-60),
    baseColor.rotateHue(-30),
    baseColor.rotateHue(30),
    baseColor.rotateHue(60),
  ];

  return {
    complementary,
    splitComplements,
    triadic,
    analogous,
  };
};

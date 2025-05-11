// r3f-wawatmos-part-4-main - Copy/src/components/TextSection.jsx

import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";
import { useMemo } from "react";
import * as THREE from "three";

export const TextSection = ({
  title,
  subtitle,
  titleFontSize = 0.52,
  titleMaxWidth = 2.5,
  titleLineHeight = 1,
  titleFont = "./fonts/DMSerifDisplay-Regular.ttf",
  subtitleFontSize = 0.2,
  subtitleMaxWidth = 2.5,
  subtitleLineHeight = 1,
  subtitleFont = "./fonts/Inter-Regular.ttf",
  textColor = "white",
  ...props
}) => {
  const materialColor = useMemo(() => new THREE.Color(textColor), [textColor]);
  const materialKey = useMemo(() => `mat-${textColor}`, [textColor]);
  return (
    <group {...props}>
      {!!title && (
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY="bottom"
          fontSize={titleFontSize}
          maxWidth={titleMaxWidth}
          lineHeight={titleLineHeight}
          font={titleFont}
        >
          {title}
          <meshStandardMaterial
            key={materialKey}
            color={materialColor}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}

      {!!subtitle && ( // Ensure subtitle also only renders if present
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY="top"
          fontSize={subtitleFontSize}
          maxWidth={subtitleMaxWidth}
          lineHeight={subtitleLineHeight} // Use the new prop for subtitle line height
          font={subtitleFont}
          // Add a small vertical offset if title is present to prevent overlap,
          // or adjust anchorY/positioning more granularly if needed.
          // This is a simple way to push subtitle down if a title exists.
          position-y={title ? -titleLineHeight * titleFontSize * 0.6 : 0} // Basic adjustment
        >
          {subtitle}
          <meshStandardMaterial
            key={materialKey}
            color={materialColor}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}
    </group>
  );
};
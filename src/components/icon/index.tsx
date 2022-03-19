import React, { memo } from "react";
import { Icons, AllIcons } from "models/Icon";

interface IconProps {
  icon: Icons;
  size?: number;
  color?: string;
}

const Icon = memo(({ icon, size = 32, color }: IconProps) => {
  const Container = AllIcons[icon];
  return <Container icon={icon} width={size} height={size} color={color} />;
});

export default Icon;

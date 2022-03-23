import React, { memo } from "react";
import filters from "assets/svg/filters.svg";

//import { Icons, AllIcons } from "../../models/Icon";

interface IconProps {
  icon: any; //Icons;
  size?: number;
  color?: string;
}

const Icon = memo(({ icon, size = 32, color }: IconProps) => {
  const Container = filters; // AllIcons[icon];
  return <Container icon={icon} width={size} height={size} color={color} />;
});

export default Icon;

import React, { forwardRef } from "react";
import styled from "styled-components";
import { Color } from "components/theme";
import Icon from "components/icon";
import { variants, sizes } from "components/button/data";
import { Icons } from "models/Icon";

type Variant = "primary" | "secondary" | "tertiary" | "quarternary";
type Size = "large" | "medium" | "auto";

interface ButtonProps {
  variant?: Variant;
  label?: string;
  size?: Size;
  onClick?: (e?: React.SyntheticEvent) => void;
  icon?: Icons;
  iconSize?: number;
  disabled?: boolean;
  className?: string;
}

const Root = styled.button<{
  variant: Variant;
  size: Size;
  padding: number;
  disabled?: boolean;
}>`
  border-radius: 4px;
  max-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: ${({ padding }) => `${padding}px`};
  border: ${({ variant }) => `1px solid ${variants[variant].border}`};
  background: ${({ variant }) => variants[variant].background};
  min-width: ${({ size }) => sizes[size].width};
  font-size: ${({ size }) => sizes[size].fontSize};
  &:hover {
    background: ${({ variant }) => variants[variant].hover_bg};
    box-shadow: ${({ variant }) =>
      variant === "secondary" && `0px 0px 8px 1px ${Color.blue}`};
    > p {
      color: ${({ variant }) => variants[variant].hover_color};
    }
    > svg {
      color: ${({ variant }) => variants[variant].hover_color};
    }
  }
  &:focus {
    outline: 0;
  }
`;

const Label = styled.p<{ variant: Variant; withIcon?: boolean }>`
  color: ${({ variant }) => variants[variant].color};
  text-transform: uppercase;
  margin: ${({ withIcon }) => (withIcon ? "0 12px 0 0" : 0)};
`;

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "auto",
      onClick,
      label,
      icon,
      iconSize = 28,
      disabled,
      className,
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <Root
        ref={ref}
        variant={variant}
        onClick={onClick}
        size={size}
        padding={label ? 18 : 12}
        disabled={disabled}
        className={className}
      >
        {label && (
          <Label variant={variant} withIcon={!!icon}>
            {label}
          </Label>
        )}
        {icon && (
          <Icon icon={icon} color={variants[variant].color} size={iconSize} />
        )}
      </Root>
    );
  }
);

export default Button;

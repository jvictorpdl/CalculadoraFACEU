import React from "react";
import { Wrapper, Line, Center } from "./styles";

export default function Ordivider({
  label = "OU",
  className,
  margin,
  gap,
  lineColor,
  textColor,
  uppercase = true,
  ...rest
}) {
  const text = uppercase ? String(label).toUpperCase() : label;

  return (
    <Wrapper
      className={className}
      $margin={margin}
      $gap={gap}
      role="separator"
      aria-label={text}
      {...rest}
    >
      <Line aria-hidden="true" $lineColor={lineColor} />
      <Center $textColor={textColor} $uppercase={uppercase}>{text}</Center>
      <Line aria-hidden="true" $lineColor={lineColor} />
    </Wrapper>
  );
}

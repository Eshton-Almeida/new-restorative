import * as RadioGroup from "@radix-ui/react-radio-group";
import { ComponentProps } from "react";

interface SurveySingleSelectContentViewProps {
  value: ComponentProps<typeof RadioGroup.Root>["value"];
  onValueChange: ComponentProps<typeof RadioGroup.Root>["onValueChange"];

  options: Array<{
    id: string;
    label: string;
  }>;
  activeId: string;
}

export function SurveySingleSelectContentView({
  options,
  value,
  activeId,
  onValueChange,
}: SurveySingleSelectContentViewProps) {
  return (
    <RadioGroup.Root
      className="flex flex-col gap-2"
      value={value}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.id}
          value={option.id}
          data-active={option.id === activeId}
          className="btn-accent"
        >
          {option.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

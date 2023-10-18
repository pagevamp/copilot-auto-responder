"use client";

import * as Select from "@radix-ui/react-select";
import React from "react";

export interface SelectOption<V = void> {
  value: V extends string ? V : string;
  label: string;
}

interface Props<V> extends Select.SelectProps {
  value: V extends string ? V : string;
  options: SelectOption<V>[];
  className?: string;
}

const SelectField = <V,>({
  options,
  value,
  onValueChange,
  className = "",
}: Props<V>) => {
  const selectedOption = options.find((option) => option.value === value);
  console.log(selectedOption);

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={`w-full flex items-center justify-between border border-gray-300 rounded-md px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-transparent text-violet11 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none ${className}`}
        aria-label="Food"
      >
        <Select.Value
          aria-label={selectedOption?.label || "Select option..."}
          placeholder="Select option..."
        >
          {selectedOption?.label || "Select option..."}
        </Select.Value>
        <Select.Icon className="text-violet11">
          {/* <ChevronDownIcon /> */}
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            {/* <ChevronUpIcon /> */}
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            {options.map(({ value, label }) => (
              <SelectItem
                value={value}
                key={value}
                {...(selectedOption?.value === value
                  ? { "data-highlighted": true }
                  : {})}
              >
                {label}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            {/* <ChevronDownIcon /> */}
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef<any, Select.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={
          "text-[13px] hover:bg-gray-100 leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 cursor-pointer"
        }
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";

export default SelectField;

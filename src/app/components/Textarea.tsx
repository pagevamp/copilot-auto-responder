"use client";

import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

const Textarea = ({
  onValueChange,
  ...props
}: {
  onValueChange(value: string): void;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>) => {
  return (
    <textarea {...props} onChange={(e) => onValueChange(e.target.value)} />
  );
};

export default Textarea;

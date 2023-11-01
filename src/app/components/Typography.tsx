import { ReactNode } from "react";

const Typography = ({
  variant = "body",
  text,
  bold = false,
  className = "",
}: {
  variant?: "title" | "info" | "body" | "label";
  text: ReactNode;
  bold?: boolean;
  className?: string;
}) => {
  const boldClassName = bold ? "font-bold" : "";
  const classNames = `${className} ${boldClassName}`;
  switch (variant) {
    case "title":
      return (
        <h3 className={`text-heading-xl text-text ${classNames}`}>{text}</h3>
      );

    case "info":
      return (
        <p
          className={`text-body-lg font-normal text-text-secondary ${classNames}`}
        >
          {text}
        </p>
      );
    case "label":
      return (
        <p className={`text-heading-md text-text ${classNames}`}>{text}</p>
      );
    case "body":
    default:
      return <p className={`text-body-md ${classNames}`}>{text}</p>;
  }
};

export default Typography;

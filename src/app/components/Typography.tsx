import { ReactNode } from "react";

const Typography = ({
  variant = "body",
  text,
  bold = false,
  className = "",
}: {
  variant?: "title" | "info" | "body";
  text: ReactNode;
  bold?: boolean;
  className?: string;
}) => {
  const boldClassName = bold ? "font-bold" : "";
  const classNames = `${className} ${boldClassName}`;
  switch (variant) {
    case "title":
      return <h3 className={`text-2xl ${classNames}`}>{text}</h3>;

    case "info":
      return (
        <p className={`font-normal text-gray-500 ${classNames}`}>{text}</p>
      );

    case "body":
    default:
      return <p className={`text-sm ${classNames}`}>{text}</p>;
  }
};

export default Typography;

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
            return <h3 className={`text-xl text-text ${classNames}`}>{text}</h3>;

        case "info":
            return <p className={`text-lg font-normal text-text-secondary ${classNames}`}>{text}</p>;

        case "body":
        default:
            return <p className={`text-md ${classNames}`}>{text}</p>;
    }
};

export default Typography;

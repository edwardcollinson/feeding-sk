import Link from "next/link";

interface TagProps {
  label: string;
  href?: string;
  color?: string;
}

export default function Tag({ label, href, color }: TagProps) {
  const style = color ? { backgroundColor: `${color}20`, color } : undefined;
  const classes =
    "inline-block rounded-full px-3 py-1 text-xs font-semibold transition-colors";

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} hover:opacity-80`}
        style={style || { backgroundColor: "#3CB96120", color: "#3CB961" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <span
      className={classes}
      style={style || { backgroundColor: "#3CB96120", color: "#3CB961" }}
    >
      {label}
    </span>
  );
}

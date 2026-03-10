interface LinkCardProps {
  link: {
    title: string;
    url: string;
    icon?: string;
    description?: string;
  };
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border-2 border-evergreen/10 bg-white px-6 py-4 text-center hover:border-emerald hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-center gap-3">
        {link.icon && <span className="text-xl">{link.icon}</span>}
        <span className="font-semibold text-evergreen">{link.title}</span>
      </div>
      {link.description && (
        <p className="text-sm text-evergreen/50 mt-1">{link.description}</p>
      )}
    </a>
  );
}

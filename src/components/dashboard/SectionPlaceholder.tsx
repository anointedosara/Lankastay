export default function SectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-sm">
      <h2 className="text-xl font-bold text-navy">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted">
        {description ?? "This section is coming soon."}
      </p>
    </section>
  );
}

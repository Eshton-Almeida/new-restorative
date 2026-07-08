interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function ConsentCheckbox({
  id,
  checked,
  onCheckedChange,
  title,
  children,
}: ConsentCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex gap-4 rounded-xl border border-accent p-4 cursor-pointer transition-colors hover:bg-white/5"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-accent"
      />
      <span className="flex flex-col gap-2">
        <span className="text-xl font-semibold">{title}</span>
        <span className="text-lg opacity-75 leading-relaxed">{children}</span>
      </span>
    </label>
  );
}

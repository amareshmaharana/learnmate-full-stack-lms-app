import { Ban, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  buttonText,
  description,
  title,
  href,
}: iAppProps) {
  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-md border border-dashed p-10 text-center animate-in fade-in-50">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
          <Ban className="size-10 text-red-600" />
        </div>

        <h2 className="text-3xl font-semibold">{title}</h2>

        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>

        <Link href={href} className={buttonVariants()}>
          <PlusCircleIcon className="size-5 mr-2" />
          {buttonText}
        </Link>
      </div>
    </>
  );
}

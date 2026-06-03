import Link from "next/link";

export default function NeedLinkPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 text-center">
      <h1 className="font-display text-2xl font-bold text-violet-900">
        Your personal link
      </h1>
      <p className="text-violet-700 leading-relaxed">
        To use these workbooks, open the link your teacher gave you. It starts
        with your name and opens straight into Purple Ruler.
      </p>
      <p className="text-sm text-violet-600">
        If you lost the link, ask your teacher. They can send it again.
      </p>
      <Link href="/" className="pr-btn-primary inline-block">
        Back to start
      </Link>
    </div>
  );
}

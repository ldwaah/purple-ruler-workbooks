import { redirect } from "next/navigation";

export default function MathsPage() {
  redirect("/hub?tab=maths");
}

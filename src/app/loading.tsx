import { LoaderOne } from "@/components/ui/loader";

export default function Loading() {
  // Or a custom loading skeleton component
  return <div className="flex h-[80vh] items-center justify-center">
    <LoaderOne />
  </div>
}

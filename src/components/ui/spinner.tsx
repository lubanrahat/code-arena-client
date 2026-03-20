import { LoaderOne } from "@/components/ui/loader"

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <LoaderOne className={className} {...props} />
  )
}


export { Spinner }

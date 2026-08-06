import { useInView } from "@/hooks/use-in-view";

/** Map iframe that is only created once it scrolls into view. */
export function LazyMap({ title, src }: { title: string; src: string }) {
  const { ref, inView } = useInView<HTMLDivElement>("400px");
  return (
    <div ref={ref} className="border border-border">
      {inView ? (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[22rem] w-full grayscale sm:h-[28rem]"
        />
      ) : (
        <div className="h-[22rem] w-full bg-secondary/60 sm:h-[28rem]" aria-hidden="true" />
      )}
    </div>
  );
}

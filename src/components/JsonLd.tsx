/**
 * Renders a JSON-LD <script> tag. Escapes "</" so page content can never
 * prematurely close the script tag (standard JSON-LD embedding safety rule).
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

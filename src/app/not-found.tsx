import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="text-preset-2 not-found__title">Page Not Found</h1>
        <p className="text-preset-7 not-found__subtitle">
          Sorry, we couldn’t find the page you were looking for on{" "}
          <strong>Please check the url is correct</strong>.
        </p>
        <Link href="/" className="not-found__link">
          Return Home
        </Link>
      </div>
    </section>
  );
}

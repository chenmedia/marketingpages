import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: PageProps<"/logg-inn">) {
  const params = await searchParams;
  const next = typeof params.neste === "string" ? params.neste : "/admin";
  const denied = params.feil === "ingen-tilgang";

  return (
    <main className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <p className="display text-2xl">Chen&nbsp;Media</p>
        <p className="mt-1 text-sm text-smoke">Kalenderadministrasjon</p>
      </div>

      {denied && (
        <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900">
          Kontoen din har ikke tilgang til administrasjonen. Ta kontakt med Kai.
        </p>
      )}

      <LoginForm next={next} />
    </main>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col gap-2">
      <a href="/dashboard" className="underline text-blue-400 hover:text-blue-700">Dashboard</a>
      <a href="/auth/login" className="underline text-blue-400 hover:text-blue-700">Login</a>
    </main>
  );
}

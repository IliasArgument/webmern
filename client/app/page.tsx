"use server";
import CollectionsList from "../components/CollectionsList";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">
      <CollectionsList />
    </main>
  );
}

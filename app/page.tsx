
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const dynamic = "force-dynamic";

async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>{session ? `Welcome, ${session.user.name}` : "Not signed in"}</h1>
    </div>
  );
}

export default Home;
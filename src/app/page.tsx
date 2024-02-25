import { AuthButton } from "@/components/AuthButton";
import Sidebar from "@/components/Sidebar";
import Tiles from "@/components/Tile";

export default function Home() {
    const isSignedIn = false;
    return (
        <main className="flex min-h-screen flex-row">
            <Sidebar />
            {isSignedIn ? <AuthButton /> : <Tiles />}
        </main>
    );
}

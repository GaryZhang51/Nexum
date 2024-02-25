import { AuthButton } from "@/components/AuthButton";
import Sidebar from "@/components/Sidebar";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-row">
            <Sidebar />
            <AuthButton />
        </main>
    );
}

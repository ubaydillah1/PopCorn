import MostBookedFilm from "@/components/MostBookedFilm";
import RecentUsers from "@/components/RecentUsers";
import TotalRevenue from "@/components/TotalRevenue";
import TotalTicket from "@/components/TotalTicket";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TotalTicket />
        <TotalRevenue />
        <MostBookedFilm />
      </div>

      <div className="mt-8">
        <RecentUsers />
      </div>
    </div>
  );
}

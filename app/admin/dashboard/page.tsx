export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl bg-card text-foreground p-6 shadow-md border">
          <h2 className="text-sm text-muted-foreground">Total Tickets</h2>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="rounded-xl bg-card text-foreground p-6 shadow-md border">
          <h2 className="text-sm text-muted-foreground">Total Revenue</h2>
          <p className="text-2xl font-bold">$ 45.000.000</p>
        </div>
        <div className="rounded-xl bg-card text-foreground p-6 shadow-md border">
          <h2 className="text-sm text-muted-foreground">Most Booked Film</h2>
          <p className="text-xl font-semibold">Avengers: Endgame</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Recent Users
        </h2>
        <div className="rounded-xl border bg-card text-foreground shadow-md">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-muted-foreground">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Total Tickets</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "John Doe", email: "john@example.com", tickets: 12 },
                { name: "Jane Smith", email: "jane@example.com", tickets: 9 },
                { name: "Alan Walker", email: "alan@example.com", tickets: 5 },
              ].map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/40">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.tickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

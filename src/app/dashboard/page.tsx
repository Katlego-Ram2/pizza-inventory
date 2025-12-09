
import CardStats from "@/components/CardStats";

export default function HomeDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <CardStats title="Total Items" value="124" />
        <CardStats title="Low Stock" value="9" />
        <CardStats title="Orders Today" value="18" />
        <CardStats title="Revenue" value="R 2,430" />
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <p className="text-xl font-semibold">Welcome to Pizza Inventory System</p>
      </div>
    </div>
  );
}

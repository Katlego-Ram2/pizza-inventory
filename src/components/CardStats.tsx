
export default function CardStats({ title, value }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-600">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}

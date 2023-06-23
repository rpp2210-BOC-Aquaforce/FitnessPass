import AddLocation from '../../../components/AddLocation';

export default async function StudioPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-3xl font-bold mb-4">Specific Studio Goes Here</p>

      <AddLocation />
    </div>
  );
}

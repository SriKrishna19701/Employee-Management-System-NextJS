"use client";
import { useEffect, useState } from "react";

type Employee = {
  _id: string;
  name: string;
  position: string;
};

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const fetchEmployees = async (pageNumber: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/employees?page=${pageNumber}&limit=5`
      );
      if (!res.ok) {
        throw new Error(`Failed to load employees: ${res.status}`);
      }

      const data = await res.json();
      setEmployees(data?.data ?? []);
      setTotalPages(data?.totalPages ?? 1);
      setTotalEmployees(data?.totalEmployees ?? 0);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
      setTotalPages(1);
      setTotalEmployees(0);
    }
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  const handleSignOut = () => {
    window.alert('Signed out');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-6 md:flex-row">
        <aside className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:w-72">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
            <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Total employees
              </p>
              <p className="mt-4 text-5xl font-semibold text-slate-900">
                {totalEmployees}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Sign Out
          </button>
        </aside>

        <main className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">Employees</h1>
            <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
          </div>

          <div className="space-y-4">
            {employees.map(emp => (
              <div key={emp._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{emp.name}</p>
                <p className="text-sm text-slate-600">{emp.position}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

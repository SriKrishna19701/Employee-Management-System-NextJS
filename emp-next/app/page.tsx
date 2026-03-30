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
      console.error("Error fetching employees:", error);
      setEmployees([]);
      setTotalPages(1);
      setTotalEmployees(0);
    }
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  const handleSignOut = () => {
    window.alert("Signed out");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <header className="mb-10 overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-2xl shadow-slate-900/20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Employee dashboard
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                Team overview and active headcount
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
                Browse employee records, track total headcount, and navigate with a polished dashboard experience.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200">
            <div className="rounded-[1.75rem] bg-slate-950 px-6 py-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Sections
              </p>
              <nav className="mt-6 space-y-3">
                <button
                  type="button"
                  className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Overview
                </button>
                <button
                  type="button"
                  className="w-full rounded-3xl bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Employees
                </button>
                <button
                  type="button"
                  className="w-full rounded-3xl bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Settings
                </button>
              </nav>
            </div>
          </aside>

          <main className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                  Total employees
                </p>
                <p className="mt-5 text-5xl font-semibold text-slate-900">{totalEmployees}</p>
                <p className="mt-3 text-sm text-slate-500">
                  Active employees currently in the system.
                </p>
              </div>

              <div className="rounded-[1.75rem] bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-500 p-6 text-white shadow-xl shadow-slate-300/40 ring-1 ring-slate-200">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/80">
                  Page status
                </p>
                <p className="mt-5 text-5xl font-semibold">{page} / {totalPages}</p>
                <p className="mt-3 text-sm text-cyan-100/90">
                  Use the pagination buttons to browse the list.
                </p>
              </div>
            </div>

            <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                    Employee list
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-slate-900">People</h2>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Showing page {page} of {totalPages}
                </div>
              </div>

              <div className="grid gap-4">
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <div
                      key={emp._id}
                      className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <p className="text-lg font-semibold text-slate-900">{emp.name}</p>
                      <p className="mt-2 text-sm text-slate-600">{emp.position}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
                    No employees found. Adjust the page selection or refresh the dashboard.
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                  Prev
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                  Next
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

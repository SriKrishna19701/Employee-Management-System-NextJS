"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async (pageNumber) => {
    const res = await fetch(
      `http://localhost:5000/api/employees?page=${pageNumber}&limit=5`
    );
    const data = await res.json();

    setEmployees(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  return (
    <div>
      <h1>Employees</h1>

      {employees.map(emp => (
        <p key={emp._id}>
          {emp.name} - {emp.position}
        </p>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button 
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span> Page {page} of {totalPages} </span>

        <button 
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
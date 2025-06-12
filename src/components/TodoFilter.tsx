"use client";

import type { FilterType } from "@/lib/types";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function TodoFilter({
  currentFilter,
  onFilterChange,
  todoCounts,
}: TodoFilterProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "전체", count: todoCounts.all },
    { key: "active", label: "진행 중", count: todoCounts.active },
    { key: "completed", label: "완료", count: todoCounts.completed },
  ];

  return (
    <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentFilter === filter.key
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}

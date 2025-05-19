// app/admin/films/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FilmTable from "@/components/FilmTable";
import FilmForm from "@/components/FilmForm";
import { Film, Metadata } from "@/types/film";

export default function AdminFilmsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Film> | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/metadata")
      .then((res) => res.json())
      .then((data) => setMetadata(data));
  }, []);

  const handleSave = async (
    filmData: Partial<Film> & {
      authorId: number;
      studioId: number;
      genreIds: number[];
    }
  ) => {
    const method = filmData.id ? "PUT" : "POST";
    const endpoint = filmData.id
      ? `http://localhost:3000/api/admin/films/${filmData.id}`
      : "http://localhost:3000/api/admin/films";

    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filmData),
    });

    setIsOpen(false);
    setNeedRefresh(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Film Management</h1>
        <Button
          onClick={() => {
            setFormData(null);
            setIsOpen(true);
          }}
        >
          Add New Film
        </Button>
      </div>

      <FilmTable
        refresh={needRefresh}
        onRefreshed={() => setNeedRefresh(false)}
        onEdit={(film) => {
          setFormData(film);
          setIsOpen(true);
        }}
      />

      {metadata && (
        <FilmForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSave}
          formData={formData || {}}
          metadata={metadata}
        />
      )}
    </div>
  );
}

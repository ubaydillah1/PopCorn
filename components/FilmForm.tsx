"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Film, Metadata } from "@/types/film";
import { X } from "lucide-react";

interface FilmFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: Partial<Film> & {
      authorId: number;
      studioId: number;
      genreIds: number[];
    }
  ) => void;
  formData?: Partial<Film>;
  metadata: Metadata;
}

export default function FilmForm({
  open,
  onClose,
  onSubmit,
  formData = {},
  metadata,
}: FilmFormProps) {
  const [form, setForm] = useState<Partial<Film>>(formData);
  const [authorId, setAuthorId] = useState<number>();
  const [studioId, setStudioId] = useState<number>();
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreviewUrl, setPosterPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const formattedDate = formData.releaseDate
      ? new Date(formData.releaseDate).toLocaleDateString("en-CA")
      : "";

    setForm({
      ...formData,
      releaseDate: formattedDate,
    });

    const author = metadata.authors.find((a) => a.name === formData.author);
    const studio = metadata.studios.find((s) => s.name === formData.studio);
    const genres = metadata.genres.filter((g) =>
      formData.genre?.includes(g.name)
    );

    setAuthorId(author?.id);
    setStudioId(studio?.id);
    setGenreIds(genres.map((g) => g.id));

    if (formData.posterPath) {
      setPosterPreviewUrl(formData.posterPath);
    }
  }, [formData, metadata]);

  const toggleGenre = (id: number) => {
    setGenreIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePosterSelect = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isTooBig = file.size > 3 * 1024 * 1024;

    if (!isImage) {
      alert("File harus berupa gambar.");
      return;
    }
    if (isTooBig) {
      alert("Ukuran maksimum file adalah 3MB.");
      return;
    }

    setPosterFile(file);
    setPosterPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.ageRating ||
      !form.duration ||
      !form.releaseDate ||
      !form.synopsis ||
      !authorId ||
      !studioId ||
      genreIds.length === 0
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    let posterUrl = form.posterPath;

    // Upload file jika ada yang dipilih baru
    if (posterFile) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", posterFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) {
        alert("Gagal upload poster.");
        setIsSubmitting(false);
        return;
      }

      const data = await res.json();
      posterUrl = data.url;
    }

    await onSubmit({
      ...form,
      posterPath: posterUrl,
      authorId,
      studioId,
      genreIds,
    });

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{form?.id ? "Edit Film" : "Add New Film"}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Poster</Label>
            {posterPreviewUrl ? (
              <div className="relative w-full max-w-[66%]">
                <Image
                  src={posterPreviewUrl}
                  alt="Poster Preview"
                  width={400}
                  height={300}
                  className="rounded object-cover w-full h-auto shadow"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPosterPreviewUrl(null);
                    setPosterFile(null);
                  }}
                  className="absolute -top-2 -right-2 bg-white text-black rounded-full p-1 shadow-md"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePosterSelect(file);
                }}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Age Rating</Label>
            <Input
              name="ageRating"
              value={form.ageRating || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Duration</Label>
            <Input
              name="duration"
              value={form.duration || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Release Date</Label>
            <Input
              type="date"
              name="releaseDate"
              value={form.releaseDate || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2">
              {metadata.genres.map((genre) => (
                <Button
                  key={genre.id}
                  type="button"
                  variant={genreIds.includes(genre.id) ? "default" : "outline"}
                  onClick={() => toggleGenre(genre.id)}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Author</Label>
            <Select
              value={authorId?.toString()}
              onValueChange={(val) => setAuthorId(Number(val))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                {metadata.authors.map((a) => (
                  <SelectItem key={a.id} value={a.id.toString()}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Studio</Label>
            <Select
              value={studioId?.toString()}
              onValueChange={(val) => setStudioId(Number(val))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select studio" />
              </SelectTrigger>
              <SelectContent>
                {metadata.studios.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Synopsis</Label>
            <textarea
              name="synopsis"
              value={form.synopsis || ""}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm"
              required
            />
          </div>

          <Button className="w-full mt-2" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? form?.id
                ? "Saving..."
                : "Adding..."
              : form?.id
              ? "Save Changes"
              : "Add Film"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

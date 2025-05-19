"use client";

import { useEffect, useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.ageRating ||
      !form.duration ||
      !form.releaseDate ||
      !form.posterPath ||
      !form.synopsis ||
      !authorId ||
      !studioId ||
      genreIds.length === 0
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    await onSubmit({ ...form, authorId, studioId, genreIds });
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
            <Label>Poster URL</Label>
            <Input
              name="posterPath"
              value={form.posterPath || ""}
              onChange={handleChange}
              required
            />
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

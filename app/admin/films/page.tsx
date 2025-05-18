// Updated Admin Films Page with multiple genre support and scrollable dialog
"use client";

import { useState } from "react";
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

// Define Film type
type Film = {
  id: number;
  title: string;
  ageRating: string;
  duration: string;
  releaseDate: string;
  genre: string[];
  synopsis: string;
  author: string;
  studio: string;
  posterPath: string;
};

const initialForm: Partial<Film> = {
  title: "",
  ageRating: "",
  duration: "",
  releaseDate: "",
  genre: [],
  synopsis: "",
  author: "",
  studio: "",
  posterPath:
    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop",
};

const dummyFilms: Film[] = [
  {
    id: 1,
    title: "Avengers: Endgame",
    ageRating: "13+",
    duration: "3h 2m",
    releaseDate: "2023-05-15",
    genre: ["Action", "Sci-Fi"],
    synopsis: "A battle to reverse the snap.",
    author: "Joe Russo",
    studio: "Marvel Studios",
    posterPath:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Inception",
    ageRating: "13+",
    duration: "2h 28m",
    releaseDate: "2023-06-01",
    genre: ["Action", "Thriller"],
    synopsis: "A dream within a dream.",
    author: "Christopher Nolan",
    studio: "Warner Bros",
    posterPath:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop",
  },
];

const genres = ["Action", "Drama", "Comedy", "Thriller", "Romance", "Sci-Fi"];
const authors = [
  "Joe Russo",
  "Christopher Nolan",
  "Quentin Tarantino",
  "Steven Spielberg",
];
const studios = [
  "Marvel Studios",
  "Warner Bros",
  "Universal",
  "Paramount Pictures",
];

export default function AdminFilmsPage() {
  const [films, setFilms] = useState<Film[]>(dummyFilms);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Film>>(initialForm);

  const handleOpen = (film: Partial<Film> = initialForm) => {
    setFormData(film);
    setIsOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleGenre = (genre: string) => {
    const selected = formData.genre || [];
    if (selected.includes(genre)) {
      setFormData({ ...formData, genre: selected.filter((g) => g !== genre) });
    } else {
      setFormData({ ...formData, genre: [...selected, genre] });
    }
  };

  const handleSubmit = () => {
    if (formData.id != null) {
      setFilms((prev) =>
        prev.map((f) =>
          f.id === formData.id
            ? ({ ...f, ...formData, genre: formData.genre || [] } as Film)
            : f
        )
      );
    } else {
      const newId = films.length + 1;
      setFilms((prev) => [
        ...prev,
        {
          posterPath:
            formData.posterPath ||
            "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop",
          id: newId,
          title: formData.title || "",
          ageRating: formData.ageRating || "",
          duration: formData.duration || "",
          releaseDate: formData.releaseDate || "",
          genre: formData.genre || [],
          synopsis: formData.synopsis || "",
          author: formData.author || "",
          studio: formData.studio || "",
        },
      ]);
    }
    setIsOpen(false);
    setFormData(initialForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Film Management</h1>
        <Button onClick={() => handleOpen()}>Add New Film</Button>
      </div>

      <div className="rounded-xl border bg-card text-foreground shadow-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4">Poster</th>
              <th className="p-4">Title</th>
              <th className="p-4">Age Rating</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Release Date</th>
              <th className="p-4">Genres</th>
              <th className="p-4">Author</th>
              <th className="p-4">Studio</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film) => (
              <tr key={film.id} className="border-b">
                <td className="p-4">
                  <img
                    src={film.posterPath}
                    alt={film.title}
                    className="h-20 rounded-md object-cover"
                  />
                </td>
                <td className="p-4">{film.title}</td>
                <td className="p-4">{film.ageRating}</td>
                <td className="p-4">{film.duration}</td>
                <td className="p-4">{film.releaseDate}</td>
                <td className="p-4">{film.genre.join(", ")}</td>
                <td className="p-4">{film.author}</td>
                <td className="p-4">{film.studio}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpen(film)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setFilms((prev) => prev.filter((f) => f.id !== film.id))
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {formData.id ? "Edit Film" : "Add New Film"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Age Rating</Label>
              <Input
                name="ageRating"
                value={formData.ageRating || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                name="duration"
                value={formData.duration || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Release Date</Label>
              <Input
                type="date"
                name="releaseDate"
                value={formData.releaseDate || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Genres</Label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    type="button"
                    variant={
                      formData.genre?.includes(genre) ? "default" : "outline"
                    }
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Select
                value={formData.author}
                onValueChange={(value) =>
                  setFormData({ ...formData, author: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Studio</Label>
              <Select
                value={formData.studio}
                onValueChange={(value) =>
                  setFormData({ ...formData, studio: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select studio" />
                </SelectTrigger>
                <SelectContent>
                  {studios.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Poster URL</Label>
              <Input
                name="posterPath"
                value={formData.posterPath || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Synopsis</Label>
              <textarea
                name="synopsis"
                value={formData.synopsis || ""}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <Button className="w-full mt-2" onClick={handleSubmit}>
              {formData.id ? "Save Changes" : "Add Film"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

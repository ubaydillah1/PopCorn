/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CalendarClock } from "lucide-react";

const API_BASE = "http://localhost:3000/api/admin";

export default function AdminSchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [films, setFilms] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    filmId: 0,
    roomId: 0,
    showTimes: [""],
    price: 0,
  });

  useEffect(() => {
    fetchSchedules();
    fetchFilms();
    fetchRooms();
  }, []);

  const fetchSchedules = async () => {
    const res = await fetch(`${API_BASE}/schedules`);
    const json = await res.json();
    setSchedules(json.data);
  };

  const fetchFilms = async () => {
    const res = await fetch(`${API_BASE}/films`);
    const json = await res.json();
    setFilms(json.data);
  };

  const fetchRooms = async () => {
    const res = await fetch(`${API_BASE}/metadata`);
    const json = await res.json();
    setRooms(json.rooms);
  };

  const resetForm = () => {
    setFormData({ filmId: 0, roomId: 0, showTimes: [""], price: 0 });
    setEditId(null);
  };

  const handleAddShowtimeField = () => {
    setFormData((prev) => ({
      ...prev,
      showTimes: [...prev.showTimes, ""],
    }));
  };

  const handleRemoveShowtimeField = (index: number) => {
    const updated = [...formData.showTimes];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, showTimes: updated }));
  };

  const handleShowtimeChange = (index: number, value: string) => {
    const updated = [...formData.showTimes];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, showTimes: updated }));
  };

  const handleOpen = (schedule?: any) => {
    if (schedule) {
      setEditId(schedule.schedule_id);
      const selectedFilm = films.find((f) => f.title === schedule.film);
      const selectedRoom = rooms.find((r) => r.room_name === schedule.room);
      setFormData({
        filmId: selectedFilm?.id || 0,
        roomId: selectedRoom?.id || 0,
        showTimes: [schedule.show_time?.slice(0, 16)],
        price: schedule.price,
      });
    } else {
      resetForm();
    }
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    const validTimes = formData.showTimes.filter((time) => time);
    if (
      !formData.filmId ||
      !formData.roomId ||
      validTimes.length === 0 ||
      formData.price <= 0
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      if (editId !== null) {
        const res = await fetch(`${API_BASE}/schedules/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filmId: formData.filmId,
            roomId: formData.roomId,
            showTime: validTimes[0],
            price: formData.price,
          }),
        });
        if (!res.ok) throw new Error("Failed to update schedule");
      } else {
        try {
          for (const time of validTimes) {
            const res = await fetch(`${API_BASE}/schedules`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filmId: formData.filmId,
                roomId: formData.roomId,
                showTime: time,
                price: formData.price,
              }),
            });
            if (!res.ok) {
              const response = await res.json();
              console.log(response);
              throw new Error(response.error || "Failed to add schedule");
            }
          }
        } catch (error: any) {
          alert(
            error.message || "Something went wrong while adding schedules."
          );
        }
      }
      fetchSchedules();
      setIsOpen(false);
      resetForm();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/schedules/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete schedule");
      fetchSchedules();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Schedule Management</h1>
        <Button onClick={() => handleOpen()}>Add New Schedule</Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto min-h-[100px]">
        {schedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-10 text-center text-muted-foreground">
            <CalendarClock className="w-12 h-12 opacity-40" />
            <h3 className="text-lg font-semibold">No schedules found</h3>
            <p className="text-sm text-muted-foreground">
              Start by adding a new schedule for a film.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-4 text-left">Film</th>
                <th className="p-4 text-left">Room</th>
                <th className="p-4 text-left">Show Time</th>
                <th className="p-4 text-left">Price</th>
                {/* <th className="p-4 text-left">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {schedules.map((s: any) => (
                <tr key={s.schedule_id} className="border-b">
                  <td className="p-4">{s.film}</td>
                  <td className="p-4">{s.room}</td>
                  <td className="p-4">
                    {new Date(s.show_time).toLocaleString()}
                  </td>
                  <td className="p-4">$ {s.price.toLocaleString()}</td>
                  {/* <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleOpen(s)}
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(s.schedule_id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Schedule" : "Add New Schedule"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Film</Label>
              <Select
                value={String(formData.filmId)}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, filmId: parseInt(val) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select film" />
                </SelectTrigger>
                <SelectContent>
                  {films.map((f) => (
                    <SelectItem key={f.id} value={String(f.id)}>
                      {f.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Room</Label>
              <Select
                value={String(formData.roomId)}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, roomId: parseInt(val) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.room_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Showtimes</Label>
              {formData.showTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    type="datetime-local"
                    value={time}
                    onChange={(e) =>
                      handleShowtimeChange(index, e.target.value)
                    }
                  />
                  {formData.showTimes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveShowtimeField(index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              {!editId && (
                <Button variant="outline" onClick={handleAddShowtimeField}>
                  + Add Another Time
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: parseInt(e.target.value || "0"),
                  }))
                }
              />
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit}>
              {editId ? "Save Changes" : "Save Schedule(s)"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

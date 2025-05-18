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

type Schedule = {
  id: number;
  film: string;
  room: string;
  showTime: string;
  price: number;
};

const dummySchedules: Schedule[] = [
  {
    id: 1,
    film: "Inception",
    room: "Studio 1",
    showTime: "2025-05-20T18:30",
    price: 50000,
  },
];

const films = ["Inception", "Avengers", "The Dark Knight"];
const rooms = ["Studio 1", "Studio 2", "IMAX Room"];

export default function AdminSchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(dummySchedules);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    film: "",
    room: "",
    showTimes: [""],
    price: 0,
  });

  const resetForm = () => {
    setFormData({ film: "", room: "", showTimes: [""], price: 0 });
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

  const handleOpen = (schedule?: Schedule) => {
    if (schedule) {
      setEditId(schedule.id);
      setFormData({
        film: schedule.film,
        room: schedule.room,
        showTimes: [schedule.showTime],
        price: schedule.price,
      });
    } else {
      resetForm();
    }
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const validTimes = formData.showTimes.filter((time) => time !== "");

    if (editId !== null) {
      // Edit existing schedule (only support 1 showTime during edit)
      const updated = schedules.map((s) =>
        s.id === editId
          ? {
              ...s,
              film: formData.film,
              room: formData.room,
              showTime: validTimes[0],
              price: formData.price,
            }
          : s
      );
      setSchedules(updated);
    } else {
      // Add new schedules
      const newSchedules = validTimes.map((time, i) => ({
        id: schedules.length + i + 1,
        film: formData.film,
        room: formData.room,
        showTime: time,
        price: formData.price,
      }));
      setSchedules((prev) => [...prev, ...newSchedules]);
    }

    setIsOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Schedule Management</h1>
        <Button onClick={() => handleOpen()}>Add New Schedule</Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 text-left">Film</th>
              <th className="p-4 text-left">Room</th>
              <th className="p-4 text-left">Show Time</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-4">{s.film}</td>
                <td className="p-4">{s.room}</td>
                <td className="p-4">{new Date(s.showTime).toLocaleString()}</td>
                <td className="p-4">Rp {s.price.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleOpen(s)}
                      variant={"outline"}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(s.id)}
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
              {editId ? "Edit Schedule" : "Add New Schedule"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Film</Label>
              <Select
                value={formData.film}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, film: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select film" />
                </SelectTrigger>
                <SelectContent>
                  {films.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Room</Label>
              <Select
                value={formData.room}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, room: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
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

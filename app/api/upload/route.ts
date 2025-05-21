import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, buffer);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
}

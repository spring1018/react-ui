import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("filePath");

  if (!filePath || Array.isArray(filePath)) {
    return Response.json({ message: "Invalid file path" }, { status: 400 });
  }

  try {
    const absolutePath = path.join(process.cwd(), filePath);
    const body = fs.readFileSync(absolutePath, "utf8");
    return Response.json({ body });
  } catch (error) {
    return Response.json({ message: "Error reading file" }, { status: 500 });
  }
}

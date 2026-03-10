import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const body = await request.json();

    // Revalidate the specific post if it's a post update
    if (body._type === "post" && body.slug?.current) {
      revalidatePath(`/blog/${body.slug.current}`);
    }

    // Always revalidate these pages since they aggregate content
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/links");
    revalidatePath("/about");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}

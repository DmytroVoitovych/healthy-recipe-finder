import { fetchRecipeById } from "@/lib/api/fetchRecipeById";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Healthy recipe";

export default async function Image(props: PageProps<"/recipes/[id]/[slug]">) {
  const { id } = await props.params;
  const data = await fetchRecipeById(id);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.recipe?.title || "Healthy recipe"}
      </div>
    ),
    {
      ...size,
    }
  );
}

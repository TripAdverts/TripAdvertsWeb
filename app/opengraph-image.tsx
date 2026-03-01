import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "TripAdverts — In-Vehicle Digital Advertising in Accra, Ghana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f8fafc",
            lineHeight: 1.1,
            marginBottom: 24,
            display: "flex",
          }}
        >
          TripAdverts
          <span style={{ color: "#14b8a6" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#94a3b8",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          In-Vehicle Digital Advertising in Accra, Ghana
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#64748b",
            marginTop: 32,
            display: "flex",
          }}
        >
          Reach thousands of passengers daily through headrest-mounted tablet
          displays in taxis across Ghana.
        </div>
      </div>
    ),
    { ...size }
  );
}

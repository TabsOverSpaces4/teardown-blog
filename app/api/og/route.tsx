import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Unboxd";
  const author = searchParams.get("author") || "";
  const type = searchParams.get("type") || "teardown";
  const products = searchParams.get("products") || "";

  const productList = products
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F9F8F6",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              color: "#2A2420",
              letterSpacing: "-0.02em",
            }}
          >
            <span>Unboxd</span>
            <span style={{ color: "#E16428" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 600,
              color: "white",
              backgroundColor:
                type === "comparison" ? "#2A2420" : "#E16428",
            }}
          >
            {type === "comparison" ? "Comparison" : "Teardown"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? "40px" : "52px",
              fontWeight: 700,
              color: "#2A2420",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {productList.length > 0 && (
            <div style={{ display: "flex", gap: "8px" }}>
              {productList.map((product) => (
                <div
                  key={product}
                  style={{
                    display: "flex",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#C9B59C",
                    backgroundColor: "#EFE9E3",
                  }}
                >
                  {product}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {author && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#E16428",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {author[0]}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#C9B59C",
                  }}
                >
                  {author}
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              color: "#D9CFC7",
            }}
          >
            unboxd.blog
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

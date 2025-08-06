export type PageSizeId = "A4" | "Letter" | "Legal";

type PageSize = {
  label: string;
  width: string;
  height: string;
  padding: string;
  id: PageSizeId;
};

export const PAGE_SIZES: Record<PageSizeId, PageSize> = {
  A4: {
    label: "A4 (8.27 x 11.69 in)",
    width: "8.27in",
    height: "11.69in",
    padding: "1in",
    id: "A4",
  },
  Letter: {
    label: "Letter (8.5 x 11 in)",
    width: "8.5in",
    height: "11in",
    padding: "1in",
    id: "Letter",
  },
  Legal: {
    label: "Legal (8.5 x 14 in)",
    width: "8.5in",
    height: "14in",
    padding: "1in",
    id: "Legal",
  },
};

export const PAGE_BREAK_HEIGHT= "0.167in" as const;

export const zoomOptions = [
  "50",
  "75",
  "90",
  "100",
  "125",
  "150",
  "200",
];

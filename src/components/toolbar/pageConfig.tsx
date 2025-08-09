export const PAGE_SIZES = {
  A4: {
    label: "A4 (8.27 x 11.69 in)",
    width: "8.27in",
    height: "11.69in",
    padding: "1in",
  },
  Letter: {
    label: "Letter (8.5 x 11 in)",
    width: "8.5in",
    height: "11in",
    padding: "1in",
  },
  Legal: {
    label: "Legal (8.5 x 14 in)",
    width: "8.5in",
    height: "14in",
    padding: "1in",
  },
} as const;

export type PageSizeId = keyof typeof PAGE_SIZES; 
export const PAGE_SIZE_OPTIONS = Object.entries(PAGE_SIZES).map(([key, size]) => ({
  label: size.label,
  value: key,
}));

export const PAGE_BREAK_HEIGHT= "0.167in" as const;

// Configuration for zoom Options
const zoomOptions = [50, 75, 90, 100, 125, 150, 200];

export const ZOOM_OPTIONS = zoomOptions.map((zoom) => ({
  label: zoom.toString(),
  value: `${zoom}`,
}));

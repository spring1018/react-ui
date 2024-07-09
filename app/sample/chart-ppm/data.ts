const data1 = [
  {
    id: 1,
    x: 1,
    y: 1,
    label: "製品A",
    date: "2023-04",
    segment: "育成",
    nextSegment: "注力",
    strategy: "",
    r: 10,
  },
  {
    id: 2,
    x: 2,
    y: 3,
    label: "製品B",
    date: "2023-04",
    segment: "育成",
    nextSegment: "注力",
    strategy: "",
    r: 20,
  },
  {
    id: 3,
    x: 3,
    y: -2,
    label: "製品C",
    date: "2023-04",
    segment: "基盤",
    nextSegment: "基盤",
    strategy: "",
    r: 20,
  },
  {
    id: 4,
    x: 4,
    y: 4,
    label: "製品D",
    date: "2023-04",
    segment: "注力",
    nextSegment: "基盤",
    strategy: "",
    r: 1.5,
  },
  {
    id: 5,
    x: 2,
    y: -1,
    label: "製品E",
    date: "2023-04",
    segment: "改善",
    nextSegment: "改善",
    strategy: "",
    r: 30,
  },
];

const data2 = [
  {
    id: 6,
    x: 1,
    y: 2,
    label: "製品A",
    date: "2024-04",
    segment: "育成",
    nextSegment: "注力",
    strategy: "",
    r: 15,
  },
  {
    id: 7,
    x: 2,
    y: 4,
    label: "製品B",
    date: "2024-04",
    segment: "育成",
    nextSegment: "注力",
    strategy: "",
    r: 35,
  },
  {
    id: 8,
    x: 3,
    y: -1,
    label: "製品C",
    date: "2024-04",
    segment: "基盤",
    nextSegment: "基盤",
    strategy: "",
    r: 5,
  },
  {
    id: 9,
    x: 4,
    y: 3,
    label: "製品D",
    date: "2024-04",
    segment: "注力",
    nextSegment: "基盤",
    strategy: "",
    r: 10,
  },
  {
    id: 10,
    x: 1.5,
    y: -1.5,
    label: "製品E",
    date: "2024-04",
    segment: "改善",
    nextSegment: "改善",
    strategy:
      "前年度から累積粗利、成長率ともに低下しているが、ICはXXと高い水準となっている。来年度はICをYY以下とし、2027年度に廃止する",
    r: 30,
  },
];

export const data = [...data1, ...data2];

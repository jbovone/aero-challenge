/// <reference types="next" />
/// <reference types="next/types/global" />

interface Card {
  img: {
    url: string;
    hdUrl: string;
  };
  id: string;
  name: string;
  cost: number;
  category: string;
  setToChart: Function;
}

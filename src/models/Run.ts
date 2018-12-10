import ISegment from "./Segment";

interface IRun {
  category: string;
  delay: number;
  game: string;
  segments: ISegment[];
}

export default IRun;

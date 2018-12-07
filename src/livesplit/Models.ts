interface ILiveSplitRun {
  game: string | null;
  category: string | null;
  offset: string | null;
  segments: ILiveSplitSegment[];
}

interface ILiveSplitSegment {
  name: string | null;
  splitTimes: ILiveSplitSplit[];
  bestSegmentTime: ILiveSplitSplit;
}

interface ILiveSplitSplit {
  realTime: string | null;
}

function parseLiveSplit(text: string): ILiveSplitRun {
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  const root = xml.getElementsByTagName("Run")[0];
  const game = root.getElementsByTagName("GameName")[0].childNodes[0].nodeValue;
  const category = root.getElementsByTagName("CategoryName")[0].childNodes[0]
    .nodeValue;
  const offset = root.getElementsByTagName("Offset")[0].childNodes[0].nodeValue;

  // Segments
  const segments: ILiveSplitSegment[] = [];
  const xmlSegments = Array.from(
    root.getElementsByTagName("Segments")[0].children
  );
  xmlSegments.forEach(segment => {
    const name = segment.getElementsByTagName("Name")[0].childNodes[0]
      .nodeValue;
    const split: ILiveSplitSplit = {
      realTime: segment
        .getElementsByTagName("SplitTimes")[0]
        .getElementsByTagName("RealTime")[0].childNodes[0].nodeValue
    };
    const bestSegment: ILiveSplitSplit = {
      realTime: segment
        .getElementsByTagName("BestSegmentTime")[0]
        .getElementsByTagName("RealTime")[0].childNodes[0].nodeValue
    };
    segments.push({
      bestSegmentTime: bestSegment,
      name,
      splitTimes: [split]
    });
  });

  return {
    category,
    game,
    offset,
    segments
  };
}

export default parseLiveSplit;

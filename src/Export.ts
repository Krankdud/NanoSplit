import exportLiveSplitToXML from "./livesplit/Export";
import IRun from "./models/Run";

function exportRun(run: IRun) {
  const liveSplitSegments: ILiveSplitSegment[] = [];
  run.segments.forEach(segment => {
    liveSplitSegments.push({
      bestSegmentTime: {
        realTime: segment.bestTime
          ? timeToLiveSplitTime(segment.bestTime)
          : null
      },
      name: segment.title,
      splitTimes: [
        {
          realTime: segment.pbTime ? timeToLiveSplitTime(segment.pbTime) : null
        }
      ]
    });
  });

  const liveSplitRun: ILiveSplitRun = {
    category: run.category,
    game: run.game,
    offset: delayToOffset(run.delay),
    segments: liveSplitSegments
  };
  const xml = exportLiveSplitToXML(liveSplitRun);
  // tslint:disable-next-line:no-console
  console.log(xml);
}

function delayToOffset(delay: number): string {
  if (delay === 0) {
    return "00:00:00";
  }
  return "-" + timeToLiveSplitTime(delay, false);
}

function timeToLiveSplitTime(time: number, includeMS: boolean = true): string {
  const milliseconds = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 360000);
  return (
    "" +
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    (includeMS
      ? "." +
        (milliseconds < 10
          ? "00" + milliseconds
          : milliseconds < 100
          ? "0" + milliseconds
          : milliseconds)
      : "")
  );
}

export default exportRun;

import parseLiveSplit from "./Parser";

//#region Data
const data = `<?xml version="1.0" encoding="UTF-8"?>
<Run version="1.7.0">
  <GameIcon />
  <GameName>Super Metroid</GameName>
  <CategoryName>Any%</CategoryName>
  <Metadata>
    <Run id="" />
    <Platform usesEmulator="False">
    </Platform>
    <Region>
    </Region>
    <Variables />
  </Metadata>
  <Offset>00:00:00</Offset>
  <AttemptCount>2</AttemptCount>
  <AttemptHistory>
    <Attempt id="1" started="12/07/2018 18:27:29" isStartedSynced="True" ended="12/07/2018 18:27:44" isEndedSynced="True">
      <RealTime>00:00:15.3060000</RealTime>
    </Attempt>
    <Attempt id="2" started="12/07/2018 18:28:08" isStartedSynced="True" ended="12/07/2018 18:28:31" isEndedSynced="True">
      <RealTime>00:00:22.2230000</RealTime>
    </Attempt>
  </AttemptHistory>
  <Segments>
    <Segment>
      <Name>Kraid</Name>
      <Icon />
      <SplitTimes>
        <SplitTime name="Personal Best">
          <RealTime>00:00:02.3350000</RealTime>
        </SplitTime>
      </SplitTimes>
      <BestSegmentTime>
        <RealTime>00:00:02.3350000</RealTime>
      </BestSegmentTime>
      <SegmentHistory>
        <Time id="1">
          <RealTime>00:00:03.2960000</RealTime>
        </Time>
        <Time id="2">
          <RealTime>00:00:02.3350000</RealTime>
        </Time>
      </SegmentHistory>
    </Segment>
    <Segment>
      <Name>Phantoon</Name>
      <Icon />
      <SplitTimes>
        <SplitTime name="Personal Best">
          <RealTime>00:00:05.2750000</RealTime>
        </SplitTime>
      </SplitTimes>
      <BestSegmentTime>
        <RealTime>00:00:02.9400000</RealTime>
      </BestSegmentTime>
      <SegmentHistory>
        <Time id="1">
          <RealTime>00:00:03.7570000</RealTime>
        </Time>
        <Time id="2">
          <RealTime>00:00:02.9400000</RealTime>
        </Time>
      </SegmentHistory>
    </Segment>
    <Segment>
      <Name>Draygon</Name>
      <Icon />
      <SplitTimes>
        <SplitTime name="Personal Best">
          <RealTime>00:00:10.0570000</RealTime>
        </SplitTime>
      </SplitTimes>
      <BestSegmentTime>
        <RealTime>00:00:03.1360000</RealTime>
      </BestSegmentTime>
      <SegmentHistory>
        <Time id="1">
          <RealTime>00:00:03.1360000</RealTime>
        </Time>
        <Time id="2">
          <RealTime>00:00:04.7820000</RealTime>
        </Time>
      </SegmentHistory>
    </Segment>
    <Segment>
      <Name>Ridley</Name>
      <Icon />
      <SplitTimes>
        <SplitTime name="Personal Best">
          <RealTime>00:00:16.2730000</RealTime>
        </SplitTime>
      </SplitTimes>
      <BestSegmentTime>
        <RealTime>00:00:03.1520000</RealTime>
      </BestSegmentTime>
      <SegmentHistory>
        <Time id="1">
          <RealTime>00:00:03.1520000</RealTime>
        </Time>
        <Time id="2">
          <RealTime>00:00:06.2160000</RealTime>
        </Time>
      </SegmentHistory>
    </Segment>
    <Segment>
      <Name>Escape</Name>
      <Icon />
      <SplitTimes>
        <SplitTime name="Personal Best">
          <RealTime>00:00:22.2230000</RealTime>
        </SplitTime>
      </SplitTimes>
      <BestSegmentTime>
        <RealTime>00:00:01.9650000</RealTime>
      </BestSegmentTime>
      <SegmentHistory>
        <Time id="1">
          <RealTime>00:00:01.9650000</RealTime>
        </Time>
        <Time id="2">
          <RealTime>00:00:05.9500000</RealTime>
        </Time>
      </SegmentHistory>
    </Segment>
  </Segments>
  <AutoSplitterSettings />
</Run>
`;
//#endregion

it("parses game title", () => {
  const run = parseLiveSplit(data);
  expect(run.game).toEqual("Super Metroid");
});

it("parses category", () => {
  const run = parseLiveSplit(data);
  expect(run.category).toEqual("Any%");
});

it("parses offset", () => {
  const run = parseLiveSplit(data);
  expect(run.offset).toEqual("00:00:00");
});

it("gets the correct number of splits", () => {
  const run = parseLiveSplit(data);
  expect(run.segments.length).toEqual(5);
});

it("parses split data correctly", () => {
  const run = parseLiveSplit(data);
  expect(run.segments[1].name).toEqual("Phantoon");
  expect(run.segments[1].splitTimes[0].realTime).toEqual("00:00:05.2750000");
  expect(run.segments[1].bestSegmentTime.realTime).toEqual("00:00:02.9400000");
});

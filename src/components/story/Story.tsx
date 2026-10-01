import { MotionProvider } from '../providers/MotionProvider';
import { IntroScene } from '../scenes/IntroScene';
import { SourceScene } from '../scenes/SourceScene';
import { UpperStreamScene } from '../scenes/UpperStreamScene';
import { HistoryScene } from '../scenes/HistoryScene';
import { IndustryScene } from '../scenes/IndustryScene';
import { DeadRiverScene } from '../scenes/DeadRiverScene';
import { RecoveryScene } from '../scenes/RecoveryScene';
import { GardenScene } from '../scenes/GardenScene';
import { WhaleScene } from '../scenes/WhaleScene';
import { JangsaengpoScene } from '../scenes/JangsaengpoScene';
import { SeaScene } from '../scenes/SeaScene';
import { ExploreScene } from '../scenes/ExploreScene';
import { NightScene } from '../scenes/NightScene';
import { EndingScene } from '../scenes/EndingScene';

// Server-rendered scenes passed through a small client orchestration boundary.
export function Story() {
  return <MotionProvider><div id="__ulsan-story">
    <IntroScene /><SourceScene /><UpperStreamScene /><HistoryScene />
    <IndustryScene /><DeadRiverScene /><RecoveryScene /><GardenScene />
    <WhaleScene /><JangsaengpoScene /><SeaScene /><ExploreScene />
    <NightScene /><EndingScene />
  </div></MotionProvider>;
}

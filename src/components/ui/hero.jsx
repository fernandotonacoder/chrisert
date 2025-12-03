import {
     VideoPlayer,
     VideoPlayerContent,
     VideoPlayerControlBar,
     VideoPlayerMuteButton,
     VideoPlayerPlayButton,
     VideoPlayerSeekBackwardButton,
     VideoPlayerSeekForwardButton,
     VideoPlayerTimeDisplay,
     VideoPlayerTimeRange,
     VideoPlayerVolumeRange,
} from '@/components/ui/shadcn-io/video-player';


const Hero = () => (
     <div className="flex flex-col gap-16 px-8 py-24 text-center">
          <div className="flex flex-col items-center justify-center gap-8">
               <a href="#">
                    {/* <Announcement>
          <AnnouncementTag>Latest</AnnouncementTag>
          <AnnouncementTitle>Introducing blocks by Kibo UI</AnnouncementTitle>
        </Announcement> */}
               </a>
               <h1 className="mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]">
                    Chrisert
               </h1>
               <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
                    Chrisert é uma empresa dedicada a fornecer aplicações de capoto, barramento, intura e remodelações de alta qualidade para clientes residenciais e comerciais. Com uma equipa experiente e comprometida, oferecemos soluções personalizadas que atendem às necessidades específicas de cada projeto.
               </p>
               
          </div>
          
          {/* <VideoPlayer className="overflow-hidden rounded-lg border">
      <VideoPlayerContent
        crossOrigin=""
        muted
        preload="auto"
        slot="media"
        src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
      />
      <VideoPlayerControlBar>
        <VideoPlayerPlayButton />
        <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton />
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
      </VideoPlayerControlBar>
    </VideoPlayer> */}
     </div>
);
export default Hero;
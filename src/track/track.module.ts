import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { ArtistModule } from '../artist/artist.module';
import { ArtistDataLoaderFactory } from '../artist/artist.dataloader';
import { Database } from 'sqlite3';

@Module({
  imports: [ArtistModule],
  providers: [TrackService, TrackResolver, ArtistDataLoaderFactory, {
    provide: Database,
    useFactory: () => new Database('chinook.sqlite'),
  },
],
  exports: [TrackService],
})
export class TrackModule {}

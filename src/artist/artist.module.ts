import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Database } from 'sqlite3';

@Module({
  providers: [
    ArtistService,
    {
      provide: Database,
      useFactory: () => new Database('chinook.sqlite'),
    },
  ],
  exports: [ArtistService],
})
export class ArtistModule {}

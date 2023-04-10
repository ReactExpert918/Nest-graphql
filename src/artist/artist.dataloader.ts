// artist.dataloader.ts
import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';

@Injectable()
export class ArtistDataLoaderFactory {
  constructor(private readonly artistService: ArtistService) {}

  createLoader(): DataLoader<number, Artist | null> {
    return new DataLoader<number, Artist | null>(async (keys: number[]) => {
      const artists = await this.artistService.getArtistsByIds(keys);
      const artistMap: Map<number, Artist> = new Map<number, Artist>(
        artists.map((artist) => [artist.id, artist]),
      );

      return keys.map((key) => artistMap.get(key) || null);
    });
  }
}

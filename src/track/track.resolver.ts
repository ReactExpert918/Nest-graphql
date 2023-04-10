import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GetTracksInput } from './dto/get-track.input';
import { Track } from './track.model';
import { TrackService } from './track.service';
import { Artist } from '../artist/artist.model';
import { ArtistDataLoaderFactory } from '../artist/artist.dataloader';
import * as DataLoader from 'dataloader';

@Resolver(() => Track)
export class TrackResolver {
  private readonly artistLoader: DataLoader<number, Artist>;
  constructor(
    private readonly trackService: TrackService,
    artistLoaderFactory: ArtistDataLoaderFactory,
  ) {
    this.artistLoader = artistLoaderFactory.createLoader();
  }

  @Query(() => [Track], { name: 'getTracks' })
  async getTracks(@Args('input') input: GetTracksInput): Promise<Track[]> {
    return this.trackService.getTracks(input);
  }

  @ResolveField('artist', () => Artist)
  async getArtistsByIds(@Parent() track: Track): Promise<Artist> {
    return await this.artistLoader.load(track.artistId);
  }
}

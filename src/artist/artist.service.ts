import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { Artist } from './artist.model';

interface ArtistRow {
    id: number;
    name: string;
  }

@Injectable()
export class ArtistService {
  constructor(private readonly db: Database) {}

  async getArtistsByIds(artistIds: number[]): Promise<Artist[]> {
    const params = artistIds.map(() => '?').join(', ');
    const query = `
      SELECT
        ArtistId as id,
        Name as name
      FROM
        Artist
      WHERE
        ArtistId IN (${params})
    `;
  
    return new Promise((resolve, reject) => {
      this.db.all(query, [...artistIds], (err, rows: ArtistRow[]) => {
        if (err) {
          reject(err);
        } else {
          const artists = rows.map((row) => ({
            id: row.id,
            name: row.name,
          }));
          resolve(artists);
        }
      });
    });
  }
}

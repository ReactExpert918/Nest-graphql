import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { GetTracksInput } from './dto/get-track.input';
import { Track } from './track.model';

interface TrackRow {
    TrackId: number;
    Name: string;
    UnitPrice: number;
    duration: number;
    genre: string;
    artistId: number;
}

@Injectable()
export class TrackService {
  constructor(private readonly db: Database) {}

  async getTracks(input: GetTracksInput): Promise<Track[]> {
    const {
      artistName,
      genreName,
      minPrice,
      maxPrice,
      page = 0,
      pageSize = 10,
    } = input;

    let query = `
      SELECT
        T.TrackId,
        T.Name,
        T.UnitPrice,
        T.Milliseconds / 1000 AS duration,
        G.Name AS genre,
        AR.ArtistId AS artistId
      FROM
        Track T
        JOIN Genre G ON T.GenreId = G.GenreId
        LEFT JOIN Album Al ON T.AlbumId = Al.AlbumId
        LEFT JOIN Artist AR ON Al.ArtistId = AR.ArtistId
      WHERE
        1 = 1
    `;

    const params = [];
    if (artistName) {
      query += ` AND T.Name = ?`;
      params.push(artistName);
    }
    if (genreName) {
      query += ` AND G.Name = ?`;
      params.push(genreName);
    }
    if (minPrice !== undefined) {
      query += ` AND T.UnitPrice >= ?`;
      params.push(minPrice);
    }
    if (maxPrice !== undefined) {
      query += ` AND T.UnitPrice < ?`;
      params.push(maxPrice);
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(pageSize, page * pageSize);

    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows: TrackRow[]) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows);
          const tracks = rows.map((row) => ({
            id: row.TrackId,
            name: row.Name,
            price: row.UnitPrice,
            duration: row.duration,
            genre: row.genre,
            artistId: row.artistId
          }));
          resolve(tracks);
        }
      });
    });
  }
}
  

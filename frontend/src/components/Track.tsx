import { useQuery, gql } from '@apollo/client';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const pageSize = 20;

const GET_TRACKS = gql`
  query GetTracks($input: GetTracksInput!) {
    getTracks(input: $input) {
      id
      name
      price
      duration
      genre
      artist {
        id
        name
      }
    }
  }
`;

export const TrackList = () => {
  const [page, setPage] = useState(0);
  const [artistName, setArtistName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, fetchMore } = useQuery(GET_TRACKS, {
    variables: {
      input: {
        page: 0,
        pageSize: pageSize,
      },
    },
  });

  const handleSearch = () => {
    fetchMore({
      variables: {
        input: {
          artistName: artistName || undefined,
          genreName: genreName || undefined,
          minPrice: minPrice !== '' ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : undefined,
          page: 0,
          pageSize: pageSize,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev} ;
        return fetchMoreResult;
      },
    });
    setPage(0);
  };

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        input: {
          artistName: artistName || undefined,
          genreName: genreName || undefined,
          minPrice: minPrice !== '' ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : undefined,
          page: page + 1,
          pageSize: pageSize,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { setHasMore(false); return prev};
        return {
          getTracks: [...prev.getTracks, ...fetchMoreResult.getTracks],
        };
      },
    });
    setPage(page + 1);
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tracks
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Artist Name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Genre Name"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Min Price"
              type="number"
              InputProps={{
                inputProps: { step: "0.01" }
              }}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Max Price"
              type="number"
              InputProps={{
                inputProps: { step: "0.01" }
              }}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ marginTop: 2, marginBottom: 2 }}>
        <List>
          <ListItem>
            <ListItemText sx={{ width: '35%' }} primary="Track Name" />
            <ListItemText sx={{ width: '30%' }} primary="Genre Name" />
            <ListItemText sx={{ width: '10%' }} primary="Price" />
            <ListItemText sx={{ width: '10%' }} primary="Duration" />
            <ListItemText sx={{ width: '15%' }} primary="Artist Name" />
          </ListItem>
        </List>
        <InfiniteScroll
          dataLength={data.getTracks.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={
            <p style={{ textAlign: 'center' }}>
              <b>Hey! You've reached the end!</b>
            </p>
          }
        >
          <List>
            {data.getTracks.map((track: any) => (
              <ListItem key={track.id}>
                <ListItemText sx={{ width: '35%' }} primary={track.name} />
                <ListItemText sx={{ width: '30%' }} primary={track.genre} />
                <ListItemText sx={{ width: '10%' }} primary={`${track.price} $`} />
                <ListItemText sx={{ width: '10%' }} primary={`${track.duration} s`} />
                <ListItemText sx={{ width: '15%' }} primary={track.artist.name} />
              </ListItem>
            ))}
          </List>
        </InfiniteScroll>
      </Paper>
    </Container>
  )
}

"use client";

import { ChangeEvent, useState, useEffect } from "react";

import { useUser } from "@/hooks/useUser";
import ArtistItem from "./ArtistItem";
import { useRouter } from "next/navigation";
import { ArtistDetails } from "@/types";
import Input from "./Input";

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const router = useRouter();
    const user = useUser();

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (!query) {
            setSearchResults([]);
            return;
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
                headers: {
                    Authorization: `Bearer ${user.providerToken}`
                }
            });
            if (response.status === 401) {
               router.refresh()
            }
            const data = await response.json();
            setSearchResults(data.artists.items)
        } catch (error) {
            console.error("error searching for artists", error);
        }
    }

    // should probably move this to its own action and just pass it in as a prop to the searchbar component k
    useEffect(() => {
        const getTopArtists = async () => {
            if (user.providerToken) {
                try {
                    const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
                        headers: {
                        Authorization: `Bearer ${user.providerToken}`,
                        },
                    });
                    
                    if (response.status === 401) {
                      router.refresh()
                    }

                    if (response.ok) {
                        const data = await response.json();
                        setTopArtists(data.items)
                    }
                } catch (error) {
                    console.error("Failed to get Top Artists", error)
                }
            } else {
              setTopArtists([])
              setSearchResults([])
            }
        }

        getTopArtists();

    }, [user]);

    return (
        <div className="flex flex-col justify-between">
            <Input
              type="search"
              onChange={handleSearch}
              className="
                bg-green-100
                rounded-lg
                focus-within:shadow-lg
              "
              placeholder="search an artist..."
            />
            {searchResults.length > 0 ? (
                <div
                  className="
                    
                  "
                >
                <div
                className="
                  flex
                  flex-col
                "
                >
                <p className="
                  text-lg
                  font-semibold
                  text-green-200
                  mt-3
                  "
                >
                  Results
                </p>
                </div>
                <div 
                  className="
                  grid
                  grid-cols-2
                  sm:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-4
                  gap-3
                  mt-4
                  "
                >
                    {searchResults
                    .filter((artist: any) => artist.images[0]?.url)
                    .map((artist: any) => 
                    <ArtistItem
                      key={artist.id}
                      artistProps={{
                        id: artist.id,
                        image: artist.images[0].url,
                        pop_index: artist.popularity,
                        name: artist.name,
                        price: artist.popularity,
                        follower: artist.follower
                      }}
                    />
                  )}
                </div>
                </div>
            ) : (
              <div
                className="
                  flex
                  flex-col
                "
              >
                <p className="                  
                  text-lg
                  font-semibold
                  text-green-200
                  mt-3
                  "
                >
                    Current Top Artists
                </p>
                <div 
                  className="
                  grid
                  grid-cols-2
                  sm:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-4
                  gap-3
                  mt-4
                  "
                >
                    {topArtists.map((artist: any) => 
                    <ArtistItem
                      key={artist.id}
                      artistProps={{
                        id: artist.id,
                        image: artist.images[0].url,
                        pop_index: artist.popularity,
                        name: artist.name,
                        price: artist.popularity,
                        follower: artist.follower
                      }}
                    />
                    )}
                </div>
              </div>
            )}
        </div>
    )
}

export default SearchBar
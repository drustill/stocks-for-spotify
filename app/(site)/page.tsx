import getArtistData from "@/actions/getArtistData";
import getUserBets from "@/actions/getUserBets";
import Header from "@/components/Header"
import ListItem from "@/components/ListItem"
import SearchBar from "@/components/Searchbar";
import { Bet } from "@/types";

export default async function Home() {
  const userBets = await getUserBets();
  console.log(userBets)

  return (
    <div 
      className="
        bg-emerald-600
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-emerald-200
              text-2xl
              font-semibold
            "
          >
            Current Betsssss
          </h1>
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
            {userBets.map((bet: Bet) => 
              <ListItem 
                key={bet.artist_id}
                artistProps={{
                  id: bet.artist_id,
                  name: bet.artist_name,
                  image: bet.artist_image,
                  pop_index: bet.start_pop_index,
                  price: bet.price,
                  follower: bet.start_follower
                }}
              /> )}
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-green-200 text-2xl font-semibold">
            Market
          </h1>
        </div>
        <div>
          {/* {market.map((artist) => <div>{artist.artist_name}</div>)} */}
        </div>
      </div>
      <div className="mt-2 mb-7 px-6">
        <div className="flex flex-col justify-between space-y-3">
          <h1 className="text-green-200 text-2xl font-semibold">
            Place a Bet
          </h1>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

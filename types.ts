export interface UserDetails {
    user_id: string;
    user_name: string;
    net_worth: number;
    bets_placed: number;
    total_amt_in: number;
    total_amt_out: number;
}

export interface Friend {
    friend_id: string;
    friend_name: string;
    friend_image: string;
    friend_value: number;
}

export interface UserBetDetails {
    bets: Bet[]
}

export interface Bet {
    user_id: string
    artist_id: string
    artist_name: string
    artist_image: string
    price: number
    start_pop_index: number
    start_follower: number
    share_amount: number
    price_purchased: number
}

export interface ArtistDetails {
    id: string
    name: string
    price: number
    pop_index: number
    follower: number
    image: string
}

export interface SpotifyImage {
    height: number;
    url: string;
    width: number;
}
  
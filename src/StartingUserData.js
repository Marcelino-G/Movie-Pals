import friend_pic_1 from './friend_pic_1.png'
import friend_pic_2 from './friend_pic_2.png'

let startingUserData = [

  {user_name: "Charlie", 
  favorite_movie: "rocky", 
  profile_picture: friend_pic_1, 
  id: "1",
  recommended_movies: [
    'major pain', 
    'the lord of the rings: fellowship', 
    'hereditary', 
    'the fast and the furious',
    'US',
    'blade 1998'
  ],
  friends: ["2"]
},

{user_name: "Billy", 
  favorite_movie: "alita battle angel", 
  profile_picture: friend_pic_2, 
  id: "2",
  recommended_movies: [
    'heavyweights',  
    'parasite', 
    'eternal sunshine of the spotless mind',
    '28 days later',
    'akira',
    'juno',
  ],
  friends: ['1']
},

{}
]

export default startingUserData
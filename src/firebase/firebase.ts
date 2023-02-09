import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAGUO097c5VX261_I_uM9VHxbd0L1sZHjU',
  authDomain: 'personal-collections-app.firebaseapp.com',
  projectId: 'personal-collections-app',
  storageBucket: 'personal-collections-app.appspot.com',
  messagingSenderId: '764810995596',
  appId: '1:764810995596:web:476051fc856cc2430458a9',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

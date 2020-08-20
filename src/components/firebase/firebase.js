import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyAeqkE7sThzxlE9HrNyxJpMyvFhqsqX-lg",
  authDomain: "reddit-recommended-routine.firebaseapp.com",
  databaseURL: "https://reddit-recommended-routine.firebaseio.com",
  projectId: "reddit-recommended-routine",
  storageBucket: "reddit-recommended-routine.appspot.com",
  messagingSenderId: "758863756195",
  appId: "1:758863756195:web:55b3956391d0adc2"
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  // Authentication API
  doSignUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  // Users Firestore API
  user = id => this.db.doc(`users/${id}`)

  users = () => this.db.collection('users')

  // Merge Auth and DB user API
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snap => {
            const dbUser = snap.data()
            authUser = {
              id: authUser.uid,
              ...dbUser
            }
            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // Routines initial
  skill = () => this.db.doc('routines/skill').get()
  strength = () => this.db.doc('routines/stength').get()
  warmUp = () => this.db.doc('routines/warm-up').get()

  // Routine info
  skillInfo = name => this.db.doc(`routineInfo/${name}`).get()
  strengthInfo = name => this.db.doc(`routineInfo/${name}`).get()
  'warm-upInfo' = name => this.db.doc(`routineInfo/${name}`).get()

  // Fetch last saved strength user routine
  lastStrengthRoutine = id =>
    this.db
      .collection('userRoutines')
      .where('userId', '==', id)
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get()
}

export default Firebase

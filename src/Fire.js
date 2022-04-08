import firebase from "firebase";

const firebaseConfig = {

    apiKey: "AIzaSyCXhAXzJGB1me2dusZo3i19o8FiBdHtzw4",
    authDomain: "blog-aa31d.firebaseapp.com",
    projectId: "blog-aa31d",
    storageBucket: "blog-aa31d.appspot.com",
    messagingSenderId: "521904201911",
    appId: "1:521904201911:web:7706f505d83aa44cf02d32"

}
    
export default class Fire {
    constructor(callback) {
        console.log(process.env.apiKey)
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("articles");
    }

    getArticles(callback) {
        let ref = this.ref.orderBy("created_at");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let articles = [];
            snapshot.forEach(doc => {
                articles.push({ id: doc.id, ...doc.data() });
            });
            callback(articles.reverse());
        }, function(error) {
            callback(error);
        });
    }

    addArticle(article) {
        this.ref.add(article);
    }

    deleteArticle(article) {
        this.ref.doc(article.id).delete();
    }

    updateArticle(article) {
        this.ref.doc(article.id).update(article);
    }
}
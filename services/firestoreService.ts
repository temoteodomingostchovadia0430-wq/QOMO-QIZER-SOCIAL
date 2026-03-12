import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  getDoc,
  setDoc,
  startAfter
} from "firebase/firestore";
import { db } from "../firebase";
import { Post, User } from "../types";

// Collection names
const POSTS_COLLECTION = "posts";
const USERS_COLLECTION = "users";
const MESSAGES_COLLECTION = "messages";

export const firestoreService = {
  // Posts
  async getPosts(limitCount = 10, lastPostId?: string): Promise<Post[]> {
    if (!db) {
      console.warn("Firestore is not initialized.");
      return [];
    }
    const postsRef = collection(db, POSTS_COLLECTION);
    let q;
    
    if (lastPostId) {
      const lastPostRef = doc(db, POSTS_COLLECTION, lastPostId);
      const lastPostSnap = await getDoc(lastPostRef);
      if (lastPostSnap.exists()) {
        q = query(postsRef, orderBy("timestamp", "desc"), startAfter(lastPostSnap), limit(limitCount));
      } else {
        q = query(postsRef, orderBy("timestamp", "desc"), limit(limitCount));
      }
    } else {
      q = query(postsRef, orderBy("timestamp", "desc"), limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data
      } as Post;
    });
  },

  async addPost(post: Omit<Post, "id">): Promise<string> {
    if (!db) return "";
    const postsRef = collection(db, POSTS_COLLECTION);
    const docRef = await addDoc(postsRef, {
      ...post,
      timestamp: Timestamp.now().toDate().toISOString()
    });
    return docRef.id;
  },

  async likePost(postId: string, currentLikes: number): Promise<void> {
    if (!db) return;
    const postRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(postRef, {
      likes: currentLikes + 1
    });
  },

  // Users
  async getUser(userId: string): Promise<User | null> {
    if (!db) return null;
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as User;
    }
    return null;
  },

  async saveUser(user: User): Promise<void> {
    if (!db) return;
    const userRef = doc(db, USERS_COLLECTION, user.id);
    await setDoc(userRef, user, { merge: true });
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<void> {
    if (!db) return;
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, updates);
  },

  // Messages
  async getMessages(conversationId: string): Promise<any[]> {
    if (!db) return [];
    const messagesRef = collection(db, MESSAGES_COLLECTION);
    const q = query(
      messagesRef, 
      where("conversationId", "==", conversationId), 
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async sendMessage(message: any): Promise<string> {
    if (!db) return "";
    const messagesRef = collection(db, MESSAGES_COLLECTION);
    const docRef = await addDoc(messagesRef, {
      ...message,
      timestamp: Timestamp.now().toDate().toISOString()
    });
    return docRef.id;
  }
};

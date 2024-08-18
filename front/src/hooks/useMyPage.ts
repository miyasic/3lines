import { firestoreCollectionSummary, firestoreFieldCreatedAt, firestoreFieldUserId } from "@/constants/constantsFirebase";
import { auth, firestore } from "@/firebase/firebase";
import { myPageStateCopyWith } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useMyPage = () => {
    const [state, setState] = useState<MyPageState>({
        userSummaries: [],
        isLoading: true,
    });
    const router = useRouter();


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            // 未ログイン時
            if (!user) {
                auth.signInAnonymously();
            }
            // 匿名認証時
            if (user?.isAnonymous) {
                // トップページにリダイレクト
                router.push('/');
            }
            const fetchUserSummaries = async () => {
                setState(prevState => myPageStateCopyWith(prevState, { isLoading: true }));
                console.log(auth.currentUser?.uid);
                try {
                    const snapshot = await firestore.collection(firestoreCollectionSummary).where(firestoreFieldUserId, '==', auth.currentUser?.uid).orderBy(firestoreFieldCreatedAt, 'desc').get();
                    const summariesData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Summary[];

                    console.log(`Fetched ${summariesData.length} summaries`);

                    setState(prevState => myPageStateCopyWith(prevState, { userSummaries: summariesData, isLoading: false }));
                } catch (error) {
                    console.error("Error fetching summaries:", error);
                    setState(prevState => myPageStateCopyWith(prevState, { isLoading: false }));
                }
            };

            fetchUserSummaries();
        });
        return () => unsubscribe();
    }, []);
    return {
        userSummaries: state.userSummaries,
        isLoading: state.isLoading,
    };
};
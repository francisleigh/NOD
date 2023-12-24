import { StatusBar } from "expo-status-bar";
import {ActivityIndicator, Button, Modal, SafeAreaView, Text, TextInput, View, StyleSheet} from "react-native";

import {useUser} from "./src/hooks/useUser";
import {firebaseOptionsConfigs, getFirebase, initialiseFirebase} from "./firebase.config";
import {useCallback, useEffect, useState} from "react";
import  {useAtom} from "jotai";
import {authUser_firestore} from "./src/state/auth-user.state";
import {FirebaseAuthTypes, firebase} from "@react-native-firebase/auth";
import PhoneAuthListener = FirebaseAuthTypes.PhoneAuthListener;
function Entry() {
    const {isLoggedIn, user} = useUser();
    return (
        <>
            <SafeAreaView
                style={{
                    position: "relative",
                    borderWidth: 1,
                    borderColor: "black",
                    height: "100%",
                    width: "100%",
                    gap: 10,
                    backgroundColor: 'tomato',
                }}
            >
                <View style={{ padding: 10 }}>
                    {isLoggedIn ? <Text>Logged in</Text> : <Text>Not Logged in</Text>}
                </View>

                <View style={{ padding: 10 }}>
                    {isLoggedIn && <Button title={'Log out'} />}
                </View>


            </SafeAreaView>

            <StatusBar style="auto"/>
        </>
    );
}
const AuthStateController = ({ children }) => {
    const [, setAuthUser_firestore] = useAtom(authUser_firestore)
    const {firebaseAuth} = getFirebase();

    const onAuthStateChangedHandler = useCallback((user: FirebaseAuthTypes.User | null) => {
        setAuthUser_firestore(user);
    }, [setAuthUser_firestore]);

    useEffect(() => {
        firebaseAuth?.onAuthStateChanged(onAuthStateChangedHandler);
    }, []);

    return <>
        {children}
    </>
}

const AuthGuard = ({ children }) => {
    const {firebaseAuth, firebaseApp} = getFirebase();
    const {isLoggedIn} = useUser();

    const recaptchaVerifier = React.useRef(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');
    const [verificationId, setVerificationId] = React.useState<PhoneAuthListener>();
    const [verificationCode, setVerificationCode] = React.useState<string>('');

    const [message, showMessage] = React.useState<{text: string, color?: string }>();

    useEffect(() => {
        setShowModal(!isLoggedIn);
    }, [setShowModal, isLoggedIn]);

    const handleCreateAccount = async () => {
        if (firebaseAuth) {
            try {
                const verificationId = await firebaseAuth.verifyPhoneNumber(
                    phoneNumber,
                    recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                showMessage({
                    text: 'Verification code has been sent to your phone.',
                });
            } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }
        }
    }

    const handleConfirmVerification = async () => {
        if (firebaseAuth && verificationId) {
            try {
                const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode)
                await firebaseAuth.signInWithCredential(credential);
                showMessage({ text: 'Phone authentication successful 👍' });
            } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }
        }
    }

    return <>
        {children}
        <Modal visible={showModal} presentationStyle={'formSheet'} style={{padding: 10}}>
            <Button title={'Log in'} />
            <Button onPress={handleCreateAccount} title={'Create account'} />

            <Text style={{ marginTop: 20 }}>Enter phone number</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
            />
            <Button
                title="Send Verification Code"
                disabled={!phoneNumber}
                onPress={handleCreateAccount}
            />
            <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <Button
                title="Confirm Verification Code"
                disabled={!verificationId}
                // onPress={async () => {
                //     const phoneProvider = new firebase.auth.PhoneAuthProvider();
                //     const verificationId = await phoneProvider.verifyPhoneNumber('+0123456789', recaptchaVerifierRef);
                //     try {
                //         const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
                //         await signInWithCredential(auth, credential);
                //         showMessage({ text: 'Phone authentication successful 👍' });
                //     } catch (err) {
                //         showMessage({ text: `Error: ${err.message}`, color: 'red' });
                //     }
                // }}
            />
            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                            color: message.color || 'blue',
                            fontSize: 17,
                            textAlign: 'center',
                            margin: 20,
                        }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : undefined}

            <FirebaseRecaptchaBanner />
        </Modal>
    </>
}


export default function App() {
    const [firebaseInitialised, setFirebaseInitialised] = useState(false);
    useEffect(() => {
        initialiseFirebase()
            .then(() => {
                console.log('Firebase Initialised...');
                setFirebaseInitialised(true);
            })
            .catch((e) => {
                console.log('Error initialising Firebase', e);
            });
    }, [])

    if (!firebaseInitialised) return <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'}/>
    </View>

    return <AuthStateController>
        <AuthGuard>
            <Entry />
        </AuthGuard>
    </AuthStateController>
}

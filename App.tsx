import { StatusBar } from "expo-status-bar";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity, TextInputProps, ButtonProps
} from "react-native";

import {useUser} from "./src/hooks/useUser";
import {getFirebase, initialiseFirebase} from "./firebase.config";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {authUser_firestore} from "./src/state/auth-user.state";
import {FirebaseAuthTypes} from "@react-native-firebase/auth";
function Entry() {
    const {firebaseAuth} = getFirebase()
    const {isLoggedIn, user} = useUser();
    const [, setAuthUser_firestore] = useAtom(authUser_firestore)

    const handleLogout = useCallback(async () => {
        try {
           await firebaseAuth.signOut()
            setAuthUser_firestore(null);
        } catch (e) {
            console.log(e);
        }
    }, [firebaseAuth]);

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

                {isLoggedIn && <Text>{JSON.stringify(user, null, 2)}</Text>}

                <View style={{ padding: 10 }}>
                    {isLoggedIn && <Button title={'Log out'} onPress={handleLogout}/>}
                </View>


            </SafeAreaView>

            <StatusBar style="auto"/>
        </>
    );
}
const AuthStateController = ({ children }: { children: ReactNode }) => {
    const [, setAuthUser_firestore] = useAtom(authUser_firestore)
    const {firebaseAuth} = getFirebase();

    useEffect(() => {
        firebaseAuth?.onAuthStateChanged((user) => {
            if (user?.uid) {
                setAuthUser_firestore(user);
            }
        });
    }, []);

    return <>
        {children}
    </>
}

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const {isLoggedIn} = useUser();
    const {firebaseAuth} = getFirebase();

    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('+447715301968');

    async function signInWithPhoneNumber() {
        const confirmation = await firebaseAuth?.signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation as any);
    }

    async function confirmCode() {
        if (!!confirm) {
            try {
                const r = await confirm.confirm(verificationCode);
            } catch (error) {
                console.log('Invalid code.');
            }
        }
    }

    return (
        <>
            {children}

            <View style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <View style={{
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'grey',
                    borderRadius: 20,
                    padding: 20,
                    width: '90%'
                }}>
                    {confirm ? <>
                        <Label>Enter Verification code</Label>
                        <TextInput
                            placeholder="123456"
                            onChangeText={setVerificationCode}
                        />
                        <Button

                            title="Confirm Verification Code"
                            onPress={confirmCode}
                        />
                    </> : <>
                        <Label>Enter phone number</Label>
                        <TextInput
                            placeholder="+1 999 999 9999"
                            value={phoneNumber}
                            autoComplete="tel"
                            keyboardType="phone-pad"
                            textContentType="telephoneNumber"
                            onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
                        />
                        <Button
                            title={'Send verification code'} onPress={signInWithPhoneNumber}/>
                    </>}
                </View>
            </View>
        </>
    )
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


const Button = ({ onPress, title }: ButtonProps) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: '#3498db',
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
        }} onPress={onPress}>
            <Text style={{
                fontSize: 16,
                color: '#ffffff',
                fontWeight: 'bold',
            }}>{title}</Text>
        </TouchableOpacity>
    );
};

const Label = ({ children }: { children: ReactNode }) => {
    return <Text style={{
        fontSize: 16,
        marginBottom: 5,
        color: '#333333',
        fontWeight: 'bold',
    }}>{children}</Text>
}

const TextInput = ({style, ...props}: TextInputProps) => {
    return <TextInput
        style={[{
            height: 50,
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 8,
            paddingHorizontal: 15,
            marginTop: 10,
            fontSize: 16,
            color: '#333333',
        }, style]}
        {...props}
    />
}

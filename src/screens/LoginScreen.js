import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { loginSchema } from '../schemas/loginSchema';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useAuthStore((state) => state.setUser);

    const handleLogin = async () => {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const errors = result.error.format();
            Alert.alert('Validation Error', Object.values(errors).map(e => e._errors[0]).join('\n'));
            return;
        }

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCred.user);
            navigation.replace('Home');
        } catch (err) {
            Alert.alert('Login Error', err.message);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-white px-4">
            <Text className="text-2xl font-bold mb-6">Login</Text>
            <TextInput className="w-full border rounded p-2 mb-4" placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput className="w-full border rounded p-2 mb-4" placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <TouchableOpacity className="bg-blue-500 w-full py-3 rounded" onPress={handleLogin}>
                <Text className="text-white text-center font-bold">Login</Text>
            </TouchableOpacity>
        </View>
    );
}

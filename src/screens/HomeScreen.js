import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const user = useAuthStore((state) => state.user);
    const clearUser = useAuthStore((state) => state.clearUser);
    const navigation = useNavigation();

    const handleLogout = async () => {
        await auth.signOut();
        clearUser();
        navigation.replace('Login');
    };

    return (
        <View className="flex-1 justify-center items-center bg-gray-100">
            <Text className="text-xl mb-4">Welcome, {user?.email}</Text>
            <TouchableOpacity onPress={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                <Text className="text-white font-bold">Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

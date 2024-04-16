import { StyleSheet } from 'react-native';
import { colors } from '../themes/colors';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkBlue,
    },
});

export const mainNavigationOptions: NativeStackNavigationOptions = {
    headerShown: false,
    contentStyle: styles.container,
    animation: 'slide_from_left',
};
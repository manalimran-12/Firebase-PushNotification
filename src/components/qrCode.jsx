import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PermissionsAndroid, Platform, Alert, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';

const QRCodeWithLogo = ({ url, logo }) => {
    const qrCodeRef = useRef();
    const viewShotRef = useRef();

    const getPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to download the QR code',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            Alert.alert('Permission error', 'Failed to get permission to download the QR code');
            return false;
        }
    };

    const downloadQRCode = async () => {
        if (Platform.OS === 'android') {
            const granted = await getPermissionAndroid();
            if (!granted) {
                return;
            }
        }
        viewShotRef.current.capture().then(uri => {
            const path = `${RNFS.DownloadDirectoryPath}/qrcode_with_logo.png`;
            RNFS.copyFile(uri, path)
                .then(() => {
                    console.log('QR code saved to:', path);  // Log the path where the image is saved
                    Alert.alert('Success', 'QR code with logo has been downloaded to your downloads folder!');
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert('Error', 'Failed to download the QR code with logo');
                });
        });
    };

    return (
        <View style={styles.container}>
            <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
                <View style={styles.qrContainer}>
                    <QRCode
                        value={url}
                        size={200}
                        getRef={(ref) => (qrCodeRef.current = ref)}
                    />
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: logo }} style={styles.logo} />
                    </View>
                </View>
            </ViewShot>
            <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
                <Text style={styles.buttonText}>Download QR Code</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    qrContainer: {
        position: 'relative',
        width: 200,
        height: 200,
    },
    logoContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 120, // Increase width
        height: 40, // Increase height
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateX: -60 }, { translateY: -20 }], // Center the logo
    },
    logo: {
        width: 100, // Adjust the logo size within the box
        height: 60,
        resizeMode: 'contain',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default QRCodeWithLogo;

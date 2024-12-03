import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { Camera } from 'expo-camera'; // For camera access

export default function WorksheetPage() {
  const [description, setDescription] = useState('');
  const [afterImage, setAfterImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  // Request camera permissions when the component mounts
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (hasPermission) {
      const photo = await Camera.takePictureAsync();
      setAfterImage(photo.uri); // Save the image URI
      setCameraVisible(false); // Hide the camera view after taking the photo
    } else {
      alert("Camera permission is required.");
    }
  };

  const handleSubmit = () => {
    // Handle form submission here, such as sending data to an API
    console.log('Description:', description);
    console.log('After Image:', afterImage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worksheet - Job Details</Text>

      <View style={styles.formContainer}>
        {/* Description of Works Carried Out */}
        <Text style={styles.label}>Descriptions of Works Carried Out:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description here"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* After Pictures */}
        <Text style={styles.label}>After Pictures:</Text>
        {afterImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: afterImage }} style={styles.imagePreview} />
            <Button title="Change Picture" onPress={() => setCameraVisible(true)} />
          </View>
        ) : cameraVisible ? (
          <Camera style={styles.camera} type={Camera.Type.back}>
            <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
              <Text style={styles.captureText}>Take Photo</Text>
            </TouchableOpacity>
          </Camera>
        ) : (
          <Button title="Take After Picture" onPress={() => setCameraVisible(true)} />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  captureText: {
    color: '#fff',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

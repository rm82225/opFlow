import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

/*Define the variables for the tex inputs */
const ProfilePage = () => {
    const [userName, setUserName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [logo, setLogo] = useState(null);

// Function to handle image upload
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
        setLogo(result.assets[0].uri); // Set the URI of the selected image
      }
    };

    return (
        <ScrollView style={styles.container}>
        
          <Text style={styles.title}>Profile Page</Text>
    
          {/* Engineer Name */}
          <Text style={styles.label}>User (Engineer) Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={userName}
            onChangeText={setUserName}
          />
    
          {/* Company Logo */}
          <Text style={styles.label}>Company Logo:</Text>
          <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
            <Text style={styles.imageUploadButtonText}>Upload Logo</Text>
          </TouchableOpacity>
          {logo && <Image source={{ uri: logo }} style={styles.logo} />}
    
          {/* Company Name */}
          <Text style={styles.label}>Company Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter company name"
            value={companyName}
            onChangeText={setCompanyName}
          />
    
          {/* Address Line 1 */}
          <Text style={styles.label}>Address Line 1:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter address line 1"
            value={addressLine1}
            onChangeText={setAddressLine1}
          />
    
          {/* City and Postcode */}
          <Text style={styles.label}>City, Postcode:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter postcode"
            value={postcode}
            onChangeText={setPostcode}
          />
    
          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
          </ScrollView>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#f5f5f5",
          padding: 20,
        },
        title: {
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        },
        label: {
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 5,
        },
        input: {
          backgroundColor: "#fff",
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
          fontSize: 16,
        },
        imageUploadButton: {
          backgroundColor: "#007bff",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: 10,
        },
        imageUploadButtonText: {
          color: "#fff",
          fontWeight: "bold",
        },
        logo: {
          width: 100,
          height: 100,
          borderRadius: 5,
          alignSelf: "center",
          marginBottom: 20,
        },
        saveButton: {
          backgroundColor: "green",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          marginTop: 20,
        },
        saveButtonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      
      export default ProfilePage;
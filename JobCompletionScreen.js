import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";


const JobCompletionScreen = ({ route }) => {
  const { job, descriptions } = route.params; // Extract job and description from navigation


  const generatePDF = async () => {

    try {
      const file = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: `Job_Sheet_${job.id}`,
        base64: false,
      });

      Alert.alert("PDF Generated", `PDF saved to: ${file.filePath}`);
    } catch (error) {
      Alert.alert("Error", "An error occurred while generating the PDF.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Placeholder for Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoPlaceholder}>LOGO</Text>
        </View>
        {/* Placeholder for Company Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Company Name</Text>
          <Text style={styles.addressText}>Address Line 1</Text>
          <Text style={styles.addressText}>Address Line 2</Text>
          <Text style={styles.addressText}>City, ZIP</Text>
        </View>
      </View>
  
      {/* Job Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Service</Text>
        <Text style={styles.label}>Customer: {job.contactName}</Text>
        <Text style={styles.label}>Address: {job.location}</Text>
        <Text style={styles.label}>Resource: {job.resource || "N/A"}</Text>
        <Text style={styles.label}>Job Type: {job.title}</Text>
        <Text style={styles.label}>Reference: {job.reference}</Text>
        <Text style={styles.label}>Scheduled Start: {job.scheduledDate}</Text>
        <Text style={styles.label}>Job Duration: {job.duration} Minutes</Text>
      </View>
  
      {/* Worksheet Section */}
      <View style={styles.worksheetContainer}>
        <Text style={styles.title}>Worksheet</Text>
        <Text style={styles.label}>Before Pictures:</Text>
        <Text style={styles.label}>Description of Works Carried Out: {job.descriptions} </Text>
        <Text style={styles.label}>After Pictures:</Text>
      </View>
  
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map Goes Here</Text>
      </View>
  
      {/* Generate PDF Button */}
      <TouchableOpacity style={styles.generateButton} onPress={generatePDF}>
        <Text style={styles.generateButtonText}>Generate Job Sheet PDF</Text>
      </TouchableOpacity>
     
  </ScrollView>

  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoPlaceholder: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  addressContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  addressText: {
    fontSize: 14,
    color: "#333",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  worksheetContainer: {
    marginBottom: 20,
  },
  mapPlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    marginBottom: 20,
  },
  mapText: {
    color: "#555",
    fontSize: 14,
  },
  generateButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default JobCompletionScreen;

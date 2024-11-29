import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const JobCompletionScreen = ({ route }) => {
  const { job } = route.params; // Job details passed via navigation

  const generatePDF = async () => {
    const htmlContent = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1 {
            color: #007bff;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 10px;
            border: 1px solid #ddd;
          }
          th {
            background-color: #f4f4f4;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <h1>Job Completion Report</h1>
        <p><strong>Customer Name:</strong> ${job.customerName}</p>
        <p><strong>Job Type:</strong> ${job.type}</p>
        <p><strong>Address:</strong> ${job.address}</p>
        <p><strong>Description:</strong> ${job.description}</p>
        <p><strong>Scheduled Start:</strong> ${job.startDate}</p>
        <p><strong>Completion Time:</strong> ${new Date().toLocaleString()}</p>
        <br>
        <h2>Work Details</h2>
        <table>
          <tr>
            <th>Work Description</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>Example Work Carried Out</td>
            <td>Completed</td>
          </tr>
        </table>
      </body>
      </html>
    `;

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
    <View style={styles.container}>
      <Text style={styles.title}>Job Completion</Text>
      <Text style={styles.label}>Customer Name: {job.customerName}</Text>
      <Text style={styles.label}>Address: {job.address}</Text>
      <Text style={styles.label}>Job Type: {job.type}</Text>
      <Text style={styles.label}>Description: {job.description}</Text>

      {/* Complete Job and Generate PDF Button */}
      <TouchableOpacity style={styles.generateButton} onPress={generatePDF}>
        <Text style={styles.generateButtonText}>Generate Job Sheet PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
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

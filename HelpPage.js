import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const HelpPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>

      <Text style={styles.sectionHeader}>How to Use the Application</Text>
      <Text style={styles.text}>
        This application is designed to help you manage and track jobs effectively. Below are the steps to navigate and use the app features.
      </Text>

      <Text style={styles.sectionHeader}>1. Viewing Jobs</Text>
      <Text style={styles.text}>
        - Tap on the **Jobs** tab from the menu.{"\n"}
        - You will see a list of all scheduled jobs grouped by date.{"\n"}
        - Tap on a job to view its details, including contact name, job type, location, and duration.
      </Text>

      <Text style={styles.sectionHeader}>2. Starting a Job</Text>
      <Text style={styles.text}>
        - Navigate to the **Jobs** tab and select a job from the list.{"\n"}
        - In the job details, tap on the **Start Job** button to begin the job.{"\n"}
        - The job status will change from "Scheduled" to "Started."
      </Text>

      <Text style={styles.sectionHeader}>3. Completing a Job</Text>
      <Text style={styles.text}>
        - Once the job is started, you can mark it as complete.{"\n"}
        - In the job details, tap on the **Complete Job** button.{"\n"}
        - If there are issues, select the **Completed with Issues** button instead.{"\n"}
        - The job status will update accordingly.
      </Text>

      <Text style={styles.sectionHeader}>4. Creating a New Job</Text>
      <Text style={styles.text}>
        - Tap on the **Create Job** button on the jobs page.{"\n"}
        - Fill out the required details: Contact Name, Job Type, Description, Location, Scheduled Date, and Duration.{"\n"}
        - Press the **Submit** button to save the new job.{"\n"}
        - The new job will appear in the list under its scheduled date.
      </Text>

      <Text style={styles.sectionHeader}>Need Further Assistance?</Text>
      <Text style={styles.text}>
        If you encounter any issues or need additional support, please contact our support team at:{"\n"}
        - **Email**: support@yourapp.com{"\n"}
        - **Phone**: +123 456 7890
      </Text>

      <Text style={styles.footer}>Thank you for using our application!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007bff",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 15,
  },
  footer: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    color: "#007bff",
  },
});

export default HelpPage;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons"; // For the burger menu icon
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HelpPage from "./HelpPage";
import PdfViewer from "./PdfViewer";


/*Use navigation method so if the menu is selected and revisited, it reopens*/

function App({ navigation }) {
  const [jobs, setJobs] = useState([
    {
      id: "1",
      contactName: "Bennet Primary School",
      title: "Safety Inspection",
      description: "Inspect fire safety equipment.",
      location: "Forge Lane, Leeds, LS1 2TP",
      scheduledDate: "2024-11-27",
      duration: "2 hours",
      status: "scheduled", // Possible values: 'scheduled', 'started', 'completed'
    },
    {
      id: "2",
      contactName: "Hardy Solicitors",
      title: "New Installation",
      description: "Install a new software system.",
      location: "The Crescent, Hype Park, LS6 2NW",
      scheduledDate: "2024-11-27",
      duration: "4 hours",
      status: "scheduled", // Possible values: 'scheduled', 'started', 'completed'
    },
  ]);

  const [menuVisible, setMenuVisible] = useState(false); // State for burger menu
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [createJobModalVisible, setCreateJobModalVisible] = useState(false);
  const [newJob, setNewJob] = useState({
    contactName: "",
    title: "",
    description: "",
    location: "",
    scheduledDate: "",
    duration: "",
  });


  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setMenuVisible(false); // Close the menu when the JobsList screen comes into focus
    });

    return unsubscribe;
  }, [navigation]);

  /*group the jobs by date */
  const groupJobsByDate = () => {
    const grouped = {};
    jobs.forEach((job) => {
      if (!grouped[job.scheduledDate]) {
        grouped[job.scheduledDate] = [];
      }
      grouped[job.scheduledDate].push(job);
    });
    return grouped;
  };

  const handleJobPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleCreateJob = () => {
    if (!newJob.contactName ||
      !newJob.title ||
      !newJob.description ||
      !newJob.location ||
      !newJob.scheduledDate ||
      !newJob.duration) {
      alert("Please fill in all fields.");
      return;
    }

    setJobs((prevJobs) => [
      ...prevJobs,
      { ...newJob, id: (prevJobs.length + 1).toString(), status: "scheduled" },
    ]);
    setNewJob({
      contactName: "",
      title: "",
      description: "",
      location: "",
      scheduledDate: "",
      duration: "",
    });
    setCreateJobModalVisible(false);
    alert("Job created successfully!");
  };

  const handleStartEndJob = (status) => {
    setJobs((prevJobs) => prevJobs.map((job) => job.id === selectedJob.id
      ? { ...job, status: status }
      : job
    )
    );
    setModalVisible(false);
  };

  const renderJob = (job) => (
    <TouchableOpacity
      key={job.id}
      style={styles.jobContainer}
      onPress={() => handleJobPress(job)}
    >
      <View style={styles.iconContainer}>
        {job.status === "scheduled" && (
          <FontAwesome name="calendar" size={24} color="#007bff" />
        )}
        {job.status === "started" && (
          <FontAwesome name="play-circle" size={24} color="purple" />
        )}
        {job.status === "completed" && (
          <FontAwesome name="thumbs-up" size={24} color="green" />
        )}
        {job.status === "completed with issues" && (
          <FontAwesome name="thumbs-down" size={24} color="red" />
        )}
      </View>
      <View style={styles.jobDetails}>
        <Text style={styles.contactName}>{job.contactName}</Text>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.location}>{job.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const groupedJobs = groupJobsByDate();




  return (
    <View style={styles.container}>
    {/* Header with Burger Menu */}
    <View style={styles.header}>
      <Text style={styles.headerText}>Your Jobs</Text>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Entypo name="menu" size={44} color="black" />
      </TouchableOpacity>
    </View>

    {/* Burger Menu Modal */}
    <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >

      <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Menu</Text>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                alert("Navigate to Timesheet");
              }}
            >
              <Text style={styles.menuOptionText}>Timesheet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                alert("Navigate to Jobs");
              }}
            >
              <Text style={styles.menuOptionText}>Jobs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                alert("Navigate to CRM");
              }}
            >
              <Text style={styles.menuOptionText}>CRM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => navigation.navigate("Help")}
              >
        
              <Text style={styles.menuOptionText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuOption, { backgroundColor: "red" }]}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.menuOptionText}>Close Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={Object.keys(groupedJobs)}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => (
          <View>
            <Text style={styles.sectionHeader}>
              {new Date(date).toDateString() === new Date().toDateString()
                ? "Today"
                : new Date(date).toDateString() ===
                  new Date(Date.now() - 864e5).toDateString()
                  ? "Yesterday"
                  : date}
            </Text>
            {groupedJobs[date].map(renderJob)}
          </View>
        )} />

      {/* Create Job Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setCreateJobModalVisible(true)}
      >
        <FontAwesome name="plus" size={20} color="#fff" />
        <Text style={styles.createButtonText}>Create Job</Text>
      </TouchableOpacity>

      {/* Create Job Modal */}
      <Modal
        visible={createJobModalVisible}
        animationType="slide"
        onRequestClose={() => setCreateJobModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Job</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Name"
            value={newJob.contactName}
            onChangeText={(text) => setNewJob((prev) => ({ ...prev, contactName: text }))} />
          <TextInput
            style={styles.input}
            placeholder="Job Type"
            value={newJob.title}
            onChangeText={(text) => setNewJob((prev) => ({ ...prev, title: text }))} />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newJob.description}
            onChangeText={(text) => setNewJob((prev) => ({ ...prev, description: text }))} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={newJob.location}
            onChangeText={(text) => setNewJob((prev) => ({ ...prev, location: text }))} />
          <TextInput
            style={styles.input}
            placeholder="Start Date (DD-MM-YYYY)"
            value={newJob.scheduledDate}
            onChangeText={(text) => setNewJob((prev) => ({ ...prev, scheduledDate: text }))} />
          <TextInput
            style={styles.input}
            placeholder="Duration (e.g., 2 hours)"
            value={newJob.duration}
            onChangeText={(text) => setNewJob((prev) => ({ ...prev, duration: text }))} />

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#007bff" }]} // Submit Job Button
            onPress={() => handleCreateJob("completed")}
          >
            <Text style={styles.actionButtonText}>Submit</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "red" }]} // Close Job Button
            onPress={() => setCreateJobModalVisible(false)}
          >
            <Text style={styles.actionButtonText}>Close</Text>
          </TouchableOpacity>

        </View>
      </Modal>

      {/* Job Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedJob?.contactName}</Text>
          <Text style={styles.modalText}>Job: {selectedJob?.title}</Text>
          <Text style={styles.modalText}>Description: {selectedJob?.description}</Text>
          <Text style={styles.modalText}>Location: {selectedJob?.location}</Text>
          <Text style={styles.modalText}>Scheduled Date: {selectedJob?.scheduledDate}</Text>
          <Text style={styles.modalText}>Duration: {selectedJob?.duration}</Text>

          {/* Conditional Rendering for Start/End Job Buttons */}
          {selectedJob?.status === "scheduled" && (
            <View style={styles.buttonGroup}>

              {/* Job Details Buttons (Start, Complete, Close)*/}
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#007bff" }]} // Start Job Button
                onPress={() => handleStartEndJob("started")}
              >
                <Text style={styles.actionButtonText}>Start Job</Text>
              </TouchableOpacity>

            </View>
          )}
          {selectedJob?.status === "started" && (
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#28a745" }]} // Complete Job Button
                onPress={() => handleStartEndJob("completed")}
              >
                <Text style={styles.actionButtonText}>Complete Job</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "red" }]} // Complete with Issues Job Button
                onPress={() => handleStartEndJob("completed with issues")}
              >
                <Text style={styles.actionButtonText}>Completed with Issues</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "red" }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.actionButtonText}>Close</Text>

          </TouchableOpacity>


          {(selectedJob?.status === "completed" || selectedJob?.status === "completed with issues") && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "blue" }]}
            onPress={() =>
            navigation.navigate("PdfViewer", {
            pdfUri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Replace with your actual PDF URI
            })
          }
          >
            <Text style={styles.actionButtonText}>View Completed Job Sheet</Text>

          </TouchableOpacity>
          )}
        </View>
          
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 30,
    alignItems: "center",
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
  },
  jobContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 15,
  },
  jobDetails: {
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  menuOption: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  menuOptionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

    // Action Buttons (Start, Complete, Close)
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 15,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 15,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

const Stack = createStackNavigator();

export default function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="JobList">
        <Stack.Screen name="Help" component={HelpPage} />
        <Stack.Screen name="JobList" component={App} /> 
        <Stack.Screen name="PdfViewer" component={PdfViewer} options={{ presentation: "modal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
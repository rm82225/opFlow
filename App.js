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
// import PdfViewer from "./PdfViewer";
import JobCompletionScreen from "./JobCompletionScreen";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./styles";
import Header from './Header'; // Import the custom header
import ProfilePage from "./ProfilePage";

/*Use navigation method so if the menu is selected and revisited, it reopens*/

function App({ navigation }) {
  const [jobs, setJobs] = useState([
    {
      id: "1",
      contactName: "Bennet Primary School",
      title: "Safety Inspection",
      description: "Inspect fire safety equipment.",
      location: "Forge Lane, Leeds, LS1 2TP",
      scheduledDate: "11-10-2024",
      duration: "60",
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
    reference: "",
    scheduledDate: "",
    duration: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing the date picker

  
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

  // Set the variable for 'description of works' before completing a job. 
  const [jobDescriptions, setJobDescriptions] = useState({}); // Stores descriptions by job ID
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const [currentJobId, setCurrentJobId] = useState(null); // Tracks the currently active job ID


  const renderJob = (job) => (
    <TouchableOpacity
      key={job.id}
      style={styles.jobContainer}
      onPress={() => handleJobPress(job)}
    >
      {/*Declare statuses and icons */}
      <View style={styles.iconContainer}>
        {job.status === "scheduled" && (
          <FontAwesome name="calendar" size={30} color="#007bff" />
        )}
        {job.status === "started" && (
          <FontAwesome name="play-circle" size={30} color="purple" />
        )}
        {job.status === "completed" && (
          <FontAwesome name="thumbs-up" size={30} color="green" />
        )}
        {job.status === "completed with issues" && (
          <FontAwesome name="thumbs-down" size={30} color="red" />
        )}
      </View>
      <View style={styles.jobDetails}>
        <Text style={styles.contactName}>{job.contactName}</Text>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.location}>{job.location}</Text>
      </View>
    </TouchableOpacity>
  );

  {/*Declare variable for grouping jobs by date */}
  const groupedJobs = groupJobsByDate();

  return (
    
    <View style={styles.container}>

    {/* Header with Burger Menu */}


    <View style={styles.header}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Entypo name="menu" size={44} color="black"/>
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
              onPress={() => navigation.navigate("ProfilePage")}
              >
                
              <Text style={styles.menuOptionText}>Account Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => navigation.navigate("JobList")}
            >
              <Text style={styles.menuOptionText}>Jobs</Text>
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

       {/*Group jobs by planned start date */}        
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
          // Updated component for date selection
          <View>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
              <Text>{newJob.scheduledDate || "Select Start Date"}</Text>
            </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={newJob.scheduledDate ? new Date(newJob.scheduledDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false); // Close the picker
                    if (selectedDate) {
                      const formattedDate = selectedDate.toISOString().split("T")[0]; // Format the date (YYYY-MM-DD)
                      setNewJob((prev) => ({ ...prev, scheduledDate: formattedDate }));
                    }
                  }}
                />
              )}
          </View>


          <TextInput
            style={styles.input}
            placeholder="Duration (e.g., 60 Minutes)"
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

        <View style={styles.headerContainer}>

          <Text style={styles.headerTitle}>JOB DETAILS</Text>
          <Text style={styles.headerDate}>
            {selectedJob?.scheduledDate || "Date not available"}
          </Text>
          <Text style={styles.headerTime}>
            From {selectedJob?.startTime || "N/A"} To {selectedJob?.endTime || "N/A"}
          </Text>
        </View>

          
            {/* Contact Section */}
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>CONTACT</Text>
            <Text style={styles.contactName}>{selectedJob?.contactName || "N/A"}</Text>
          </View>

           {/* Job Details Section */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Job Type:</Text>
            <Text style={styles.detailValue}>{selectedJob?.title || "N/A"}</Text>

            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailValue}>{selectedJob?.description || "N/A"}</Text>

            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{selectedJob?.location || "N/A"}</Text>

            <Text style={styles.detailLabel}>Job Reference:</Text>
            <Text style={styles.detailValue}>{selectedJob?.reference || "N/A"}</Text>

            <Text style={styles.detailLabel}>Scheduled Date:</Text>
            <Text style={styles.detailValue}>
              {selectedJob?.scheduledDate || "N/A"}
            </Text>

            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>
              {selectedJob?.duration || "N/A"} Minutes
            </Text>
          </View>

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
          <>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "blue" }]}
            onPress={() => {
              setCurrentJobId(selectedJob?.id); // Set the current job ID
              setIsPromptVisible(true); // Open the description prompt
            }}
      
          >
            <Text style={styles.actionButtonText}>Complete Worksheet Questions</Text>

          </TouchableOpacity>

        {/* Modal for Prompting Description */}
        {isPromptVisible && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={isPromptVisible}
            onRequestClose={() => setIsPromptVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Description of Works Carried Out</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter description..."
                  value={jobDescriptions[currentJobId] || ""} // Show description for the current job
                  onChangeText={(text) =>  setJobDescriptions((prevDescriptions) => ({
                    ...prevDescriptions,
                    [currentJobId]: text, // Update only the current job's description
                  }))
                }
                />
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "green" }]}
                    onPress={() => {
                      if (!jobDescriptions[currentJobId]?.trim()) {
                        alert("Please provide a description before proceeding.");
                      } else {
                        setIsPromptVisible(false); // Close the modal
                        navigation.navigate("JobCompletionScreen", {
                          job: selectedJob,
                          descriptions: jobDescriptions[selectedJob?.id], // Pass the description for the specific job
                        });
                      }
                    }}
                  >
                    <Text style={styles.modalButtonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "red" }]}
                    onPress={() => setIsPromptVisible(false)} // Cancel
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>


          )}
          </>
          )}
        </View>
          
      </Modal>
    </View>

  );
}

      const Stack = createStackNavigator();


      export default function AppNavigator() {
       
        return (
          <View style={styles.container}>
            {/*<Header /> {/* Add the custom header */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="JobList">
              <Stack.Screen name="JobList" component={App}  /> 
              <Stack.Screen name="ProfilePage" component={ProfilePage}/>
              <Stack.Screen name="Help" component={HelpPage} />
              <Stack.Screen name="JobCompletionScreen" component={JobCompletionScreen}/>

            </Stack.Navigator>
          </NavigationContainer>
          </View>
);  
}   

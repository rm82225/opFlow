import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#f0f0f0",
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      padding: 10,
      alignItems: "center",
      elevation: 3,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff', // Match your app's theme
        elevation: 2, // Adds a subtle shadow for a consistent look
      },
      logo: {
        width: 40, // Adjust size to fit your design
        height: 40,
        marginRight: 10,
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Adjust for your theme
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

    modalContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },

    headerContainer: {
      alignItems: "center",
      marginBottom: 20,
      borderBottomWidth: 1,
      borderColor: "#ddd",
      paddingBottom: 10,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    headerDate: {
      fontSize: 16,
      color: "#666",
    },
    headerTime: {
      fontSize: 14,
      color: "#666",
    },

    contactContainer: {
      marginVertical: 15,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      backgroundColor: "#f9f9f9",
    },
    contactTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    contactName: {
      fontSize: 14,
      color: "#555",
    },
    detailsContainer: {
      marginVertical: 10,
    },
    detailLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
    },
    detailValue: {
      fontSize: 14,
      color: "#555",
      marginBottom: 8,
    },
  
    menu: {
      mmarginLeft: 1,
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
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: 16,
      color: "#555",
      marginBottom: 5,
    },
    location: {
      fontSize: 14,
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
      padding: 15,
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

    /*Styling for the buttons when submitting/cancelling description of works*/

    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      height: 40,
      borderColor: "#ddd",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    modalButton: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 5,
    },
    modalButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  


  });

  export default styles;
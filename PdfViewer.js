import React from "react";
import { WebView } from "react-native-webview";

const PdfViewer = ({ route }) => {
  const { pdfUrl } = route.params;

  return <WebView source={{ uri: pdfUrl }} style={{ flex: 1 }} />;
};

export default PdfViewer;

import { initUploadPage } from "./pages/upload.js";
import { initFilesPage } from "./pages/files.js";

if (window.location.pathname.includes("files.html")) {
  initFilesPage();
} else {
  initUploadPage();
}

import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const tableBody = document.getElementById("tableBody");

async function loadViewers() {
  try {
    const q = query(
      collection(db, "viewers"),
      orderBy("loginTime", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      tableBody.innerHTML =
        "<tr><td colspan='4'>No viewer data found.</td></tr>";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();

      const row = `
        <tr>
          <td>${data.name || "-"}</td>
          <td>${data.email || "-"}</td>
          <td>${
            data.loginTime
              ? data.loginTime.toDate().toLocaleString()
              : "-"
          }</td>
          <td>${data.browser || "-"}</td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });
  } catch (err) {
    console.error(err);

    tableBody.innerHTML =
      "<tr><td colspan='4'>Error loading data.</td></tr>";
  }
}

loadViewers();
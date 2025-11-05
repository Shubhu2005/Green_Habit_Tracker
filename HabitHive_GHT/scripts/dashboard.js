// scripts/dashboard.js
import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in, redirect to login page
    window.location.href = "index.html";
  }
});

// Same habits as tracker.js
const habits = [
  { id: "publicTransport", unit: "CO₂", value: 1.5 },
  { id: "reusableBottle", unit: "plastic", value: 0.2 },
  { id: "recycledWaste", unit: "waste", value: 0.5 },
  { id: "walked", unit: "CO₂", value: 2.1 },
  { id: "ledLights", unit: "CO₂", value: 0.8 },
  { id: "plantMeal", unit: "CO₂", value: 1.2 },
  { id: "noPlastic", unit: "plastic", value: 0.3 },
  { id: "savedWater", unit: "water", value: 15 },
  { id: "bike", unit: "CO₂", value: 3.2 },
  { id: "compost", unit: "waste", value: 0.7 },
  { id: "renewable", unit: "CO₂", value: 2.5 },
  { id: "localProduce", unit: "CO₂", value: 0.9 }
];

const summary = {
  "CO₂": 0,
  "water": 0,
  "plastic": 0,
  "waste": 0
};

const dayStreak = () => {
  const today = new Date();
  return [...Array(7).keys()].map(i => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d.toISOString().split("T")[0];
  });
};

function updateSummaryCards(totals, streakCount) {
  console.log('Updating summary cards with:', totals);
  document.getElementById("co2Saved").innerText = totals["CO₂"].toFixed(1);
  document.getElementById("waterSaved").innerText = Math.round(totals["water"]);
  document.getElementById("plasticSaved").innerText = totals["plastic"].toFixed(1);
  document.getElementById("streak").innerText = streakCount;
}

function drawLineChart(dailyData) {
  const ctx = document.getElementById("lineChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(dailyData),
      datasets: [{
        label: "CO₂ Saved (kg)",
        data: Object.values(dailyData),
        borderColor: "green",
        fill: false
      }]
    }
  });
}

function drawDoughnutChart(categories) {
  const ctx = document.getElementById("doughnutChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"]
      }]
    }
  });
}

function calculateStreak(logs) {
  const today = new Date();
  let streak = 0;
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    
    if (logs[dateStr]) {
      const dayEntries = logs[dateStr];
      let hasAnyHabit = false;
      
      if (Array.isArray(dayEntries)) {
        // New format - array of submissions
        for (const entry of dayEntries) {
          const habitEntries = entry.habits;
          if (Object.values(habitEntries).some(habit => habit === true)) {
            hasAnyHabit = true;
            break;
          }
        }
      } else {
        // Old format - direct habit mapping
        hasAnyHabit = Object.values(dayEntries).some(habit => habit === true);
      }
      
      if (hasAnyHabit) {
        streak++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  return streak;
}

function processHabits(data) {
  const dailyCO2 = {};
  const categoryImpact = { "CO₂": 0, "water": 0, "plastic": 0, "waste": 0 };
  let streakCount = 0;

  habits.forEach(habit => {
    for (let date in data) {
      const dayEntries = data[date];
      
      if (Array.isArray(dayEntries)) {
        // New format - array of submissions
        for (const entry of dayEntries) {
          const habitEntries = entry.habits;
          if (habitEntries[habit.id]) {
            summary[habit.unit] += habit.value;

            if (habit.unit === "CO₂") {
              dailyCO2[date] = (dailyCO2[date] || 0) + habit.value;
            }
            categoryImpact[habit.unit] += habit.value;
          }
        }
      } else {
        // Old format - direct habit mapping
        if (dayEntries[habit.id]) {
          summary[habit.unit] += habit.value;

          if (habit.unit === "CO₂") {
            dailyCO2[date] = (dailyCO2[date] || 0) + habit.value;
          }
          categoryImpact[habit.unit] += habit.value;
        }
      }
    }
  });

  // Calculate streak using the same logic as profile.html
  streakCount = calculateStreak(data);
  console.log("Current streak:", streakCount);
  
  updateSummaryCards(summary, streakCount);
  drawLineChart(dailyCO2);
  drawDoughnutChart(categoryImpact);
}

async function loadData(user) {
  try {
    const docRef = doc(db, "habits", user.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      processHabits(data);
    } else {
      alert("No habit data found.");
    }
  } catch (error) {
    console.error("Error loading dashboard:", error);
    
    // Provide user-friendly error messages based on error code
    let errorMessage = "Unable to load your dashboard data. Please try again later.";
    
    if (error.code && error.code.startsWith('firestore/')) {
      switch(error.code) {
        case 'firestore/permission-denied':
          errorMessage = "You don't have permission to access your data. Please log out and log back in.";
          break;
        case 'firestore/unavailable':
          errorMessage = "The service is currently unavailable. Please try again later.";
          break;
        case 'firestore/not-found':
          errorMessage = "Your dashboard data could not be found. Please contact support.";
          break;
        case 'firestore/network-request-failed':
          errorMessage = "Network error. Please check your internet connection and try again.";
          break;
      }
    }
    
    alert(errorMessage);
  }
}

// Auth + Load
onAuthStateChanged(auth, user => {
  if (user) {
    loadData(user);
  } else {
    // Check if this is an intentional logout
    if (!sessionStorage.getItem('intentionalLogout')) {
      alert("Please log in first.");
    }
    // Clear the flag
    sessionStorage.removeItem('intentionalLogout');
    window.location.href = "index.html";
  }
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  // Set a flag in sessionStorage to indicate intentional logout
  sessionStorage.setItem('intentionalLogout', 'true');
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

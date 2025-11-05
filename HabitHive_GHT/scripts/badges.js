// badges.js
import { auth, db } from "../firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in, redirect to login page
    window.location.href = "index.html";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const badgeGrid = document.getElementById("badgeGrid");

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const badges = data.badges || {};

        const allBadges = [
          { id: "firstLog", name: "First Steps", description: "Logged your first habit", icon: "first-log.png" },
          { id: "threeDays", name: "Week Warrior", description: "7-day habit streak", icon: "3day-streak.png" },
          { id: "sevenDays", name: "Recycling Hero", description: "Logged 10 recycling habits", icon: "7day-streak.png" },
          { id: "transportMaster", name: "Transport Master", description: "Use public transport 20 times", icon: "plastic-free.png" },
          { id: "habitMaster", name: "Eco Champion", description: "30-day habit streak", icon: "habit-master.png" },
          { id: "planetSaver", name: "Planet Saver", description: "Save 100kg CO₂", icon: "first-log.png" }
        ];

        allBadges.forEach(badge => {
          const badgeCard = document.createElement("div");
          badgeCard.classList.add("badge");
          const isEarned = badges[badge.id] === true;
          if (isEarned) badgeCard.classList.add("earned");

          const badgeIcon = document.createElement("div");
          badgeIcon.classList.add("badge-icon");
          badgeIcon.textContent = badge.id === "firstLog" ? "🌱" : 
                                 badge.id === "threeDays" ? "🔥" : 
                                 badge.id === "sevenDays" ? "♻️" : 
                                 badge.id === "transportMaster" ? "🚌" : 
                                 badge.id === "habitMaster" ? "🏆" : "🌍";

          const badgeName = document.createElement("h3");
          badgeName.textContent = badge.name;

          const badgeDesc = document.createElement("p");
          badgeDesc.textContent = badge.description;

          const badgeStatus = document.createElement("span");
          badgeStatus.classList.add("status");
          badgeStatus.textContent = isEarned ? "✓ Earned" : "🔒 Locked";

          badgeCard.appendChild(badgeIcon);
          badgeCard.appendChild(badgeName);
          badgeCard.appendChild(badgeDesc);
          badgeCard.appendChild(badgeStatus);
          badgeGrid.appendChild(badgeCard);
        });

      } else {
        console.log("User data not found");
      }
    } else {
      window.location.href = "index.html";
    }
  });
});

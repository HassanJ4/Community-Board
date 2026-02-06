const display = document.getElementById("app");
const form = document.getElementById("form");
const filterButtons = document.querySelectorAll(".category-btn");
const openFormBtn = document.getElementById("open-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const listingPopup = document.getElementById("listing-popup");

let listingsData = [];

const mockListings = [
  {
    name: "Alex",
    title: "Part-time Barista",
    category: "jobs",
    brief: "Local cafe looking for help",
    body: "Friendly cafe looking for a part-time barista. Experience preferred but not required."
  },
  {
    name: "Community Team",
    title: "Weekly Yoga Session",
    category: "events",
    brief: "Free outdoor yoga",
    body: "Join us every Sunday morning for a free yoga session in the park. All levels welcome."
  },
  {
    name: "Sam",
    title: "Board Game Night",
    category: "get-togethers",
    brief: "Casual games & snacks",
    body: "Monthly board game night at the community centre. Bring a game or just turn up."
  },
  {
    name: "Jess",
    title: "Intro to Web Development",
    category: "courses",
    brief: "Beginner coding workshop",
    body: "Learn HTML, CSS, and JavaScript basics in a friendly workshop environment."
  },
  {
    name: "Admin",
    title: "Centre Closed Monday",
    category: "announcements",
    brief: "Maintenance update",
    body: "The community centre will be closed this Monday due to scheduled maintenance."
  }
];

openFormBtn.addEventListener("click", () => {
  listingPopup.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => {
  listingPopup.style.display = "none";
});

listingPopup.addEventListener("click", e => {
  if (e.target === listingPopup) {
    listingPopup.style.display = "none";
  }
});

function displayListings(listings) {
  display.innerHTML = "";

  listings.forEach(listing => {
    const card = document.createElement("div");
    card.className = "listing-card";

    const title = document.createElement("h3");
    const category = document.createElement("p");
    const brief = document.createElement("p");
    const body = document.createElement("p");
    const viewBtn = document.createElement("button");

    title.textContent = listing.title;
    category.textContent = `Category: ${listing.category}`;
    brief.textContent = listing.brief;
    body.textContent = listing.body;
    body.style.display = "none";

    viewBtn.textContent = "view details";
    viewBtn.addEventListener("click", () => {
      const hidden = body.style.display === "none";
      body.style.display = hidden ? "block" : "none";
      viewBtn.textContent = hidden ? "hide details" : "view details";
    });

    card.append(title, category, brief, viewBtn, body);
    display.appendChild(card);
  });
}

function filterByCategory(category) {
  if (category === "all") {
    displayListings(listingsData);
  } else {
    const filtered = listingsData.filter(
      listing => listing.category === category
    );
    displayListings(filtered);
  }
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterByCategory(button.dataset.category);
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  listingsData.push(formData);

  form.reset();
  listingPopup.style.display = "none";
  displayListings(listingsData);
});

listingsData = mockListings;
displayListings(listingsData);

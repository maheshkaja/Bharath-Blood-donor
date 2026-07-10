// ==========================================
// BHARATH BLOOD DONOR - PREMIUM CONTROLLER V2
// ==========================================

// 1. Complete list of 26 Districts and Cities/Towns in Andhra Pradesh
const DISTRICTS_AP = {
    "Ananthapuramu": ["Anantapur", "Guntakal", "Tadipatri", "Dharmavaram", "Rayadurg", "Kalyandurg", "Gooty", "Pamidi"],
    "Sri Sathya Sai": ["Puttaparthi", "Hindupur", "Kadiri", "Penukonda", "Madakasira", "Bukkapatnam"],
    "Kurnool": ["Kurnool", "Adoni", "Yemmiganur", "Dhone", "Kodumur", "Pathikonda", "Gudur"],
    "Nandyal": ["Nandyal", "Allagadda", "Banaganapalle", "Nandikotkur", "Atmakur", "Koilkuntla", "Dhone"],
    "YSR Kadapa": ["Kadapa", "Proddatur", "Pulivendula", "Badvel", "Jammalamadugu", "Yerraguntla", "Kamalapuram"],
    "Annamayya": ["Rayachoty", "Madanapalle", "Rajampet", "Railway Kodur", "Lakkireddipalli", "Pileru"],
    "Chittoor": ["Chittoor", "Punganur", "Kuppam", "Nagari", "Palamaner", "Gangadhara Nellore"],
    "Tirupati": ["Tirupati", "Srikalahasti", "Gudur", "Sullurpeta", "Naidupeta", "Puttoor", "Venkatagiri", "Chandragiri"],
    "SPS Nellore": ["Nellore", "Kavali", "Kovur", "Atmakur", "Udayagiri", "Allur", "Buchireddypalem"],
    "Prakasam": ["Ongole", "Kandukur", "Singarayakonda", "Podili", "Kanigiri", "Markapur", "Giddalur", "Chirala"],
    "Bapatla": ["Bapatla", "Chirala", "Repalle", "Addanki", "Parchur", "Karlapalem", "Vemuru"],
    "Palnadu": ["Narasaraopet", "Sattenapalle", "Chilakaluripet", "Macherla", "Piduguralla", "Vinukonda"],
    "Guntur": ["Guntur", "Tenali", "Mangalagiri", "Tadepalli", "Ponnur", "Chebrolu", "Amaravati"],
    "NTR": ["Vijayawada", "Ibrahimpatnam", "Nandigama", "Tiruvuru", "Jaggayyapeta", "Mylavaram", "Kanchikacherla"],
    "Krishna": ["Machilipatnam", "Gudivada", "Nuzvid", "Pamarru", "Penamaluru", "Challapalli", "Vuyyuru"],
    "Eluru": ["Eluru", "Jangareddygudem", "Chintalapudi", "Kaikaluru", "Polavaram", "Denduluru"],
    "West Godavari": ["Bhimavaram", "Tadepalligudem", "Tanuku", "Palakollu", "Narasapuram", "Kovvur", "Nidadavole"],
    "East Godavari": ["Rajahmundry", "Kovvur", "Nidadavole", "Anaparthi", "Dowleswaram"],
    "Dr. B.R. Ambedkar Konasema": ["Amalapuram", "Ravulapalem", "Mandapeta", "Mummidivaram", "Kothapeta", "Ramachandrapuram"],
    "Kakinada": ["Kakinada", "Pithapuram", "Samalkot", "Tuni", "Peddapuram", "Prathipadu"],
    "Alluri Sitharama Raju": ["Paderu", "Araku Valley", "Rampachodavaram", "Chinturu", "Ananthagiri"],
    "Anakapalli": ["Anakapalli", "Narsipatnam", "Yellamanchili", "Chodavaram", "Madugula", "Payakaraopeta"],
    "Visakhapatnam": ["Visakhapatnam", "Gajuwaka", "Pendurthi", "Bheemunipatnam", "Anakapalli"],
    "Vizianagaram": ["Vizianagaram", "Bobbili", "Cheepurupalli", "Gajapathinagaram", "Srungavarapukota"],
    "Parvathipuram Manyam": ["Parvathipuram", "Salur", "Palakonda", "Kurupam"],
    "Srikakulam": ["Srikakulam", "Palasa", "Amadalavalasa", "Ichchapuram", "Tekkali", "Narasannapeta", "Pathapatnam"]
};

const BLOOD_GROUPS = [
    "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-",
    "A1+", "A1-", "A2+", "A2-", "A1B+", "A1B-", "A2B+", "A2B-",
    "Bombay Phenotype (Oh+)", "Bombay Phenotype (Oh-)", "Rh-null (Golden)"
];

// 2. Compatibility Matrix definitions
const COMPATIBILITY = {
    "O-": {
        donate: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
        receive: ["O-"]
    },
    "O+": {
        donate: ["O+", "A+", "B+", "AB+"],
        receive: ["O+", "O-"]
    },
    "A-": {
        donate: ["A-", "A+", "AB-", "AB+"],
        receive: ["A-", "O-"]
    },
    "A+": {
        donate: ["A+", "AB+"],
        receive: ["A+", "A-", "O+", "O-"]
    },
    "B-": {
        donate: ["B-", "B+", "AB-", "AB+"],
        receive: ["B-", "O-"]
    },
    "B+": {
        donate: ["B+", "AB+"],
        receive: ["B+", "B-", "O+", "O-"]
    },
    "AB-": {
        donate: ["AB-", "AB+"],
        receive: ["AB-", "A-", "B-", "O-"]
    },
    "AB+": {
        donate: ["AB+"],
        receive: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
    }
};

// 3. Mock Data Seeding (Matching UI Screenshots)
const MOCK_DONORS_V2 = [
    { id: "d1", name: "Srinivasa Rao", phone: "9948512121", bloodGroup: "O+", district: "NTR", city: "Vijayawada", age: 29, gender: "Male", totalDonations: 12, lastDonated: "2026-03-10", status: "Available" },
    { id: "d2", name: "Ramesh Kumar Konda", phone: "9848012345", bloodGroup: "O+", district: "Visakhapatnam", city: "Visakhapatnam", age: 32, gender: "Male", totalDonations: 8, lastDonated: "2026-03-10", status: "Available" },
    { id: "d3", name: "Priya Rao Maddala", phone: "8765432109", bloodGroup: "A+", district: "NTR", city: "Vijayawada", age: 26, gender: "Female", totalDonations: 4, lastDonated: "2026-04-15", status: "Available" },
    { id: "d4", name: "Satish Naidu Y.", phone: "7654321098", bloodGroup: "B+", district: "Guntur", city: "Guntur", age: 34, gender: "Male", totalDonations: 15, lastDonated: "2026-05-15", status: "Available" },
    { id: "d5", name: "Venkata Reddy Pallam", phone: "9123456789", bloodGroup: "O-", district: "SPS Nellore", city: "Nellore", age: 41, gender: "Male", totalDonations: 6, lastDonated: "2026-01-20", status: "Available" },
    { id: "d6", name: "Lakshmi Devi G.", phone: "9848022338", bloodGroup: "AB+", district: "Kurnool", city: "Kurnool", age: 31, gender: "Female", totalDonations: 2, lastDonated: "Never", status: "Available" },
    { id: "d7", name: "Harish Varma B.", phone: "9000123456", bloodGroup: "A-", district: "Tirupati", city: "Tirupati", age: 25, gender: "Male", totalDonations: 5, lastDonated: "2025-12-05", status: "Available" },
    { id: "d8", name: "Subbaiah Sastry", phone: "9948512121", bloodGroup: "AB-", district: "NTR", city: "Vijayawada", age: 65, gender: "Male", totalDonations: 3, lastDonated: "2026-04-12", status: "Available" }
];

const MOCK_REQUESTS_V2 = [
    { id: "r1", patientName: "Subbaiah Sastry", bloodGroup: "AB-", hospital: "Ramesh Hospitals, Vijayawada", district: "NTR", city: "Vijayawada", units: 3, urgency: "URGENT", reason: "Cardiac Surgery Emergency", contactName: "Narayana (Son)", phone: "9948512121", date: "2026-07-04" },
    { id: "r2", patientName: "Baby of Sireesha", bloodGroup: "O-", hospital: "Rainbow Children Hospital, Vijayawada", district: "NTR", city: "Vijayawada", units: 2, urgency: "URGENT", reason: "Neonatal Jaundice Exchange Transfusion", contactName: "Gopi (Father)", phone: "9177199000", date: "2026-07-05" },
    { id: "r3", patientName: "Anil Kumar P.", bloodGroup: "A+", hospital: "SVIMS Hospital, Alipiri Road", district: "Tirupati", city: "Tirupati", units: 1, urgency: "Normal", reason: "Thalassemia Transfusion", contactName: "Srinivas (Brother)", phone: "7654321098", date: "2026-07-07" },
    { id: "r4", patientName: "Mohan Reddy", bloodGroup: "AB-", hospital: "Ramesh Hospitals", district: "Guntur", city: "Guntur", units: 2, urgency: "URGENT", reason: "Road Accident Trauma", contactName: "Prasad (Friend)", phone: "9988776655", date: "2026-07-09" },
    { id: "r5", patientName: "Ramanaiah Chetty", bloodGroup: "O+", hospital: "Medicover Hospitals, Haranathapuram", district: "SPS Nellore", city: "Nellore", units: 2, urgency: "URGENT", reason: "Dialysis Complications", contactName: "Kishore (Son)", phone: "9123456789", date: "2026-07-09" }
];

// State variables
let donors = [];
let requests = [];
let selectedSearchBg = "O+";

// Initialize LocalStorage Data
function initData() {
    if (!localStorage.getItem("ap_donors_v2")) {
        localStorage.setItem("ap_donors_v2", JSON.stringify(MOCK_DONORS_V2));
    }
    if (!localStorage.getItem("ap_requests_v2")) {
        localStorage.setItem("ap_requests_v2", JSON.stringify(MOCK_REQUESTS_V2));
    }
    donors = JSON.parse(localStorage.getItem("ap_donors_v2"));
    requests = JSON.parse(localStorage.getItem("ap_requests_v2"));
}

function saveData() {
    localStorage.setItem("ap_donors_v2", JSON.stringify(donors));
    localStorage.setItem("ap_requests_v2", JSON.stringify(requests));
}

// 4. Tab Switching logic
function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.querySelectorAll(".nav-bar-item").forEach(item => {
        item.classList.remove("active");
    });

    const targetTab = document.getElementById(`tab-${tabId}`);
    const targetNavItem = document.querySelector(`.nav-bar-item[data-tab="${tabId}"]`);

    if (targetTab) targetTab.classList.add("active");
    if (targetNavItem) targetNavItem.classList.add("active");

    const mockTime = document.getElementById("mock-time");
    if (tabId === "search" || tabId === "requests") {
        mockTime.textContent = "8:14 AM";
    } else {
        mockTime.textContent = "8:15 AM";
    }

    if (tabId === "search") {
        executeSearch();
    } else if (tabId === "requests") {
        renderRequests();
    }
    
    document.querySelector(".app-main").scrollTo({ top: 0, behavior: "smooth" });
}

// 5. Dropdown Population Helpers
function initDropdowns() {
    const searchDistrict = document.getElementById("search-district");
    const regDistrict = document.getElementById("reg-district");
    const reqDistrict = document.getElementById("req-district");
    const filterReqDistrict = document.getElementById("filter-req-district");

    // Populate Districts alphabetically sorted
    const sortedDistricts = Object.keys(DISTRICTS_AP).sort();
    const distHtml = sortedDistricts.map(d => `<option value="${d}">${d}</option>`).join("");
    searchDistrict.innerHTML = distHtml;
    regDistrict.innerHTML = `<option value="" disabled selected>Select District</option>` + distHtml;
    reqDistrict.innerHTML = `<option value="" disabled selected>Select District</option>` + distHtml;

    // Filter requests district
    filterReqDistrict.innerHTML = `<option value="">All Districts</option>` + distHtml;

    // Handle dynamic city updates
    searchDistrict.addEventListener("change", () => updateCities("search"));
    regDistrict.addEventListener("change", () => updateCities("reg"));
    reqDistrict.addEventListener("change", () => updateCities("req"));

    // Populate form dropdown blood groups
    const bgSelects = [
        document.getElementById("reg-blood-group"),
        document.getElementById("req-blood-group"),
        document.getElementById("filter-req-group")
    ];

    const bgOptions = BLOOD_GROUPS.map(g => `<option value="${g}">${g}</option>`).join("");
    
    bgSelects[0].innerHTML = `<option value="" disabled selected>Select</option>` + bgOptions;
    bgSelects[1].innerHTML = `<option value="" disabled selected>Select</option>` + bgOptions;
    bgSelects[2].innerHTML = `<option value="">All Blood Groups</option>` + bgOptions;

    // Initial city update
    searchDistrict.value = "NTR";
    updateCities("search");
}

function updateCities(prefix) {
    const distSelect = document.getElementById(`${prefix}-district`);
    const citySelect = document.getElementById(`${prefix}-city`);
    
    const selectedDist = distSelect.value;
    if (!selectedDist) {
        citySelect.innerHTML = `<option value="" disabled selected>Select City</option>`;
        return;
    }

    const cities = (DISTRICTS_AP[selectedDist] || []).sort();
    citySelect.innerHTML = cities.map(c => `<option value="${c}">${c}</option>`).join("");
    
    if (prefix === "search") {
        if (selectedDist === "NTR") {
            citySelect.value = "Vijayawada";
        }
    }
}

// 6. Search Actions
function setupSearchFilters() {
    const bgButtons = document.querySelectorAll("#search-bg-grid .blood-group-btn");
    bgButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            bgButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedSearchBg = btn.getAttribute("data-group");
            executeSearch();
        });
    });

    const fastBtns = document.querySelectorAll(".fast-track-btn");
    fastBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const group = btn.getAttribute("data-group");
            
            bgButtons.forEach(b => {
                if (b.getAttribute("data-group") === group) {
                    b.classList.add("selected");
                } else {
                    b.classList.remove("selected");
                }
            });

            selectedSearchBg = group;
            document.getElementById("search-district").value = "NTR";
            updateCities("search");
            document.getElementById("search-city").value = "Vijayawada";

            executeSearch();
            showToast(`Fast-Track Filter: ${group} in Vijayawada`);
        });
    });

    document.getElementById("btn-focus-vijayawada").addEventListener("click", () => {
        document.getElementById("search-district").value = "NTR";
        updateCities("search");
        document.getElementById("search-city").value = "Vijayawada";
        executeSearch();
        showToast("Focused on Vijayawada");
    });

    document.getElementById("btn-submit-search").addEventListener("click", () => {
        executeSearch();
    });
}

function executeSearch() {
    const district = document.getElementById("search-district").value;
    const city = document.getElementById("search-city").value;

    const filtered = donors.filter(d => {
        const matchesBg = d.bloodGroup === selectedSearchBg;
        const matchesDist = d.district === district;
        const matchesCity = d.city === city;
        return matchesBg && matchesDist && matchesCity;
    });

    renderSearchResults(filtered, selectedSearchBg, city);
}

function renderSearchResults(list, bg, city) {
    const container = document.getElementById("donors-container");
    const metaRow = document.getElementById("results-meta-row");
    const titleText = document.getElementById("results-title-text");
    const countText = document.getElementById("results-count-text");

    titleText.textContent = `${bg} Donors in ${city}`;
    countText.textContent = `${list.length} Found`;
    metaRow.style.display = "flex";

    if (list.length === 0) {
        container.innerHTML = `
            <div style="background: white; padding: 24px; text-align: center; border-radius: var(--border-radius-lg); border: 1px dashed var(--border-light);">
                <i class="fa-solid fa-face-frown" style="font-size: 2rem; color: var(--text-muted); margin-bottom: 8px;"></i>
                <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">No voluntary donors found</h4>
                <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Try changing the blood group filters or location criteria above.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(d => {
        let isResting = false;
        if (d.lastDonated && d.lastDonated !== "Never") {
            const lastDate = new Date(d.lastDonated);
            const today = new Date();
            const diffDays = Math.ceil(Math.abs(today - lastDate) / (1000 * 60 * 60 * 24));
            if (diffDays < 90) isResting = true;
        }

        const statusLabel = isResting ? "Resting" : (d.status === "Available" ? "Available" : "On Break");
        const statusClass = isResting ? "resting" : "available";
        const dotClass = (isResting || d.status !== "Available") ? "status-dot-grey" : "status-dot-green";

        return `
            <div class="donor-card">
                <div class="donor-card-top">
                    <div class="donor-avatar-circle">
                        <strong>${d.bloodGroup}</strong>
                        <span>Group</span>
                    </div>
                    <div class="donor-info-middle">
                        <div class="donor-name-row">
                            <span class="donor-name">${escapeHtml(d.name)}</span>
                            <span class="${dotClass}"></span>
                        </div>
                        <span class="donor-loc-age">
                            <i class="fa-solid fa-location-dot"></i> ${escapeHtml(d.city)}, ${escapeHtml(d.district)}
                        </span>
                        <span class="donor-loc-age">${d.age} yrs &bull; ${d.gender}</span>
                    </div>
                    <span class="donor-status-badge ${statusClass}">${statusLabel}</span>
                </div>
                
                <div class="donor-stats-row">
                    <div class="stat-left">
                        <i class="fa-solid fa-award"></i>
                        <span><strong>${d.totalDonations}</strong> donations total</span>
                    </div>
                    <div class="stat-right">Last Donated: ${d.lastDonated || "Never"}</div>
                </div>

                <div class="donor-actions-grid">
                    <div class="action-bar-btn" onclick="callPhone('${d.phone}')">
                        <i class="fa-solid fa-phone"></i>
                        <span>Call</span>
                    </div>
                    <div class="action-bar-btn" onclick="smsPhone('${d.phone}', '${d.name}', '${d.bloodGroup}')">
                        <i class="fa-solid fa-message"></i>
                        <span>SMS</span>
                    </div>
                    <div class="action-bar-btn" onclick="whatsappPhone('${d.phone}', '${d.name}', '${d.bloodGroup}')">
                        <i class="fa-brands fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </div>
                    <div class="action-bar-btn" onclick="shareDonor('${escapeHtml(d.name)}', '${d.bloodGroup}', '${d.phone}', '${escapeHtml(d.city)}')">
                        <i class="fa-solid fa-share-nodes"></i>
                        <span>Share</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// 7. Render Blood Requests
function renderRequests() {
    const container = document.getElementById("requests-container");
    const filterBg = document.getElementById("filter-req-group").value;
    const filterDist = document.getElementById("filter-req-district").value;

    const filtered = requests.filter(r => {
        const matchesBg = !filterBg || r.bloodGroup === filterBg;
        const matchesDist = !filterDist || r.district === filterDist;
        return matchesBg && matchesDist;
    });

    document.getElementById("requests-badge-count").textContent = requests.length;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="background: white; padding: 24px; text-align: center; border-radius: var(--border-radius-lg); border: 1px dashed var(--border-light);">
                <i class="fa-solid fa-heart-pulse" style="font-size: 2rem; color: var(--text-muted); margin-bottom: 8px;"></i>
                <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">No active requests</h4>
                <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Thank you for checking! Try other filter groups.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(r => {
        return `
            <div class="request-card">
                <div class="request-card-top">
                    <div class="req-blood-circle">
                        <strong>${r.bloodGroup}</strong>
                        <span>Required</span>
                    </div>
                    <div class="req-patient-middle">
                        <div class="req-name-row">
                            <span class="req-name">${escapeHtml(r.patientName)}</span>
                            <span class="req-urgent-badge">${r.urgency}</span>
                        </div>
                        <div class="req-location-date">
                            <span><i class="fa-solid fa-hospital"></i> ${escapeHtml(r.hospital)}</span>
                            <span><i class="fa-solid fa-calendar"></i> ${r.date}</span>
                        </div>
                    </div>
                    <span class="req-units-pill">${r.units} Units</span>
                </div>

                <div class="req-details-pink-box">
                    <div class="req-pink-row">
                        <span>Reason: <strong>${escapeHtml(r.reason)}</strong></span>
                    </div>
                    <div class="req-pink-row">
                        <span>Contact: <strong>${escapeHtml(r.contactName)}</strong></span>
                        <span>Phone: <strong>+91 ${r.phone}</strong></span>
                    </div>
                </div>

                <div class="req-actions-row">
                    <div class="req-donate-btn" onclick="donateRequest('${escapeHtml(r.patientName)}')">
                        <i class="fa-solid fa-heart"></i> I Can Donate
                    </div>
                    <div class="req-fulfill-btn" onclick="fulfillRequest('${r.id}')">
                        Mark Fulfilled
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// 8. Interactive Compatibility Checker
function initCompatChecker() {
    const compatButtons = document.querySelectorAll("#compat-grid .compat-btn");
    compatButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            compatButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const type = btn.getAttribute("data-type");
            renderCompatOutcomes(type);
        });
    });

    renderCompatOutcomes("O+");
}

function renderCompatOutcomes(type) {
    const donateContainer = document.getElementById("compat-donate-list");
    const receiveContainer = document.getElementById("compat-receive-list");

    const matrix = COMPATIBILITY[type] || { donate: [], receive: [] };

    donateContainer.innerHTML = matrix.donate.map(bg => `<span class="compat-pill">${bg}</span>`).join("");
    receiveContainer.innerHTML = matrix.receive.map(bg => `<span class="compat-pill">${bg}</span>`).join("");
}

// 9. Forms Listeners & Handlers
function setupForms() {
    const regDistrict = document.getElementById("reg-district");
    const regCity = document.getElementById("reg-city");

    regDistrict.addEventListener("change", () => {
        const cities = (DISTRICTS_AP[regDistrict.value] || []).sort();
        regCity.innerHTML = cities.map(c => `<option value="${c}">${c}</option>`).join("");
    });

    const regForm = document.getElementById("donor-registration-form");
    regForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("reg-name").value.trim();
        const bloodGroup = document.getElementById("reg-blood-group").value;
        const age = parseInt(document.getElementById("reg-age").value);
        const gender = document.getElementById("reg-gender").value;
        const status = document.getElementById("reg-status").value;
        const phone = document.getElementById("reg-phone").value.trim();
        const district = regDistrict.value;
        const city = regCity.value;
        const lastDonatedOption = document.getElementById("reg-last-donated").value;

        document.querySelectorAll(".form-group").forEach(g => g.classList.remove("has-error"));

        let isValid = true;
        if (!name || name.length < 3) {
            document.getElementById("reg-name").closest(".form-group").classList.add("has-error");
            isValid = false;
        }
        if (!bloodGroup) {
            document.getElementById("reg-blood-group").closest(".form-group").classList.add("has-error");
            isValid = false;
        }
        if (isNaN(age) || age < 18 || age > 65) {
            document.getElementById("reg-age").closest(".form-group").classList.add("has-error");
            isValid = false;
        }
        if (!phone || !/^[6-9][0-9]{9}$/.test(phone)) {
            document.getElementById("reg-phone").closest(".form-group").classList.add("has-error");
            isValid = false;
        }
        if (!district) {
            regDistrict.closest(".form-group").classList.add("has-error");
            isValid = false;
        }
        if (!city) {
            regCity.closest(".form-group").classList.add("has-error");
            isValid = false;
        }

        if (!isValid) {
            showToast("Please fill all required fields correctly.", true);
            return;
        }

        let lastDonatedDate = "";
        if (lastDonatedOption === "Never") {
            lastDonatedDate = "Never";
        } else if (lastDonatedOption === "Recent") {
            const d = new Date();
            d.setMonth(d.getMonth() - 1);
            lastDonatedDate = d.toISOString().split("T")[0];
        } else {
            const d = new Date();
            d.setMonth(d.getMonth() - 4);
            lastDonatedDate = d.toISOString().split("T")[0];
        }

        const newDonor = {
            id: "d_" + Date.now(),
            name,
            phone,
            bloodGroup,
            district,
            city,
            age,
            gender,
            totalDonations: lastDonatedOption === "Never" ? 0 : 3,
            lastDonated: lastDonatedDate,
            status: status === "Available" ? "Available" : "Resting"
        };

        donors.unshift(newDonor);
        saveData();
        regForm.reset();
        showToast("Registration completed successfully!");

        setTimeout(() => {
            switchTab("search");
            selectedSearchBg = newDonor.bloodGroup;
            document.querySelectorAll("#search-bg-grid .blood-group-btn").forEach(b => {
                if (b.getAttribute("data-group") === selectedSearchBg) b.classList.add("selected");
                else b.classList.remove("selected");
            });
            document.getElementById("search-district").value = newDonor.district;
            updateCities("search");
            document.getElementById("search-city").value = newDonor.city;
            executeSearch();
        }, 1500);
    });

    const reqDistrict = document.getElementById("req-district");
    const reqCity = document.getElementById("req-city");
    reqDistrict.addEventListener("change", () => {
        const cities = (DISTRICTS_AP[reqDistrict.value] || []).sort();
        reqCity.innerHTML = cities.map(c => `<option value="${c}">${c}</option>`).join("");
    });

    const reqForm = document.getElementById("blood-request-form");
    reqForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const patientName = document.getElementById("req-patient-name").value.trim();
        const bloodGroup = document.getElementById("req-blood-group").value;
        const units = parseInt(document.getElementById("req-units").value) || 1;
        const hospital = document.getElementById("req-hospital").value.trim();
        const district = reqDistrict.value;
        const city = reqCity.value;
        const reason = document.getElementById("req-reason").value.trim();
        const contactName = document.getElementById("req-contact-name").value.trim();
        const phone = document.getElementById("req-phone").value.trim();

        if (!patientName || !bloodGroup || !hospital || !district || !city || !reason || !contactName || !/^[6-9][0-9]{9}$/.test(phone)) {
            showToast("Please fill all required inputs correctly.", true);
            return;
        }

        const newRequest = {
            id: "r_" + Date.now(),
            patientName,
            bloodGroup,
            hospital,
            district,
            city,
            units,
            urgency: "URGENT",
            reason,
            contactName,
            phone,
            date: new Date().toISOString().split("T")[0]
        };

        requests.unshift(newRequest);
        saveData();
        reqForm.reset();
        closeRequestModal();
        showToast("Emergency request broadcasted!");

        setTimeout(() => {
            switchTab("requests");
        }, 800);
    });
}

// 10. Modal controls
function setupModal() {
    const trigger = document.getElementById("btn-post-request-trigger");
    const overlay = document.getElementById("request-modal");
    const closeBtn = document.getElementById("btn-close-modal");

    trigger.addEventListener("click", () => {
        overlay.classList.add("active");
    });

    closeBtn.addEventListener("click", closeRequestModal);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeRequestModal();
    });
}

function closeRequestModal() {
    document.getElementById("request-modal").classList.remove("active");
}

// 11. Toast Helpers
function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    const icon = toast.querySelector("i");
    const text = document.getElementById("toast-message");

    text.textContent = message;
    if (isError) {
        toast.style.backgroundColor = "#991b1b";
        icon.className = "fa-solid fa-circle-xmark";
        icon.style.color = "#ffffff";
    } else {
        toast.style.backgroundColor = "var(--color-dark-blue)";
        icon.className = "fa-solid fa-circle-check";
        icon.style.color = "var(--color-success)";
    }

    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// 12. Contact trigger helper integrations
function callPhone(phone) {
    window.location.href = `tel:+91${phone}`;
}

function smsPhone(phone, name, bg) {
    window.location.href = `sms:+91${phone}?body=Hello%20${name},%20we%20need%20your%20matching%20${bg}%20blood%20urgently.%20Please%20let%20us%20know%20if%20you%20can%20help.`;
}

function whatsappPhone(phone, name, bg) {
    const url = `https://wa.me/91${phone}?text=Hello%20${name},%20we%20found%20your%20contact%20on%20Bharath%20Blood%20Donor%20App.%20We%20need%20${bg}%20blood%20urgently.%20Please%20reply%20if%20available.`;
    window.open(url, "_blank");
}

function shareDonor(name, bg, phone, city) {
    const details = `Bharath Blood Donor\nVerified Volunteer Info:\nName: ${name}\nBlood Group: ${bg}\nLocation: ${city}\nContact: +91 ${phone}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(details)
            .then(() => showToast("Donor details copied to clipboard!"))
            .catch(() => showToast("Failed to copy details.", true));
    } else {
        const el = document.createElement("textarea");
        el.value = details;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        showToast("Donor details copied to clipboard!");
    }
}

function donateRequest(patientName) {
    showToast(`Request sent: Connecting with ${patientName}'s attender.`);
}

function fulfillRequest(id) {
    requests = requests.filter(r => r.id !== id);
    saveData();
    renderRequests();
    showToast("Request marked as fulfilled.");
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, tag => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    }[tag] || tag));
}

// ==========================================
// 13. LOGIN & SIGN-UP FLOW LOGIC (NEW)
// ==========================================
let users = [];
let loggedInUser = null;

function initAuth() {
    // Seed default credentials
    if (!localStorage.getItem("ap_users_v2")) {
        const defaultUsers = [
            { name: "Demo User", email: "demo@donor.com", password: "demo123", provider: "email" }
        ];
        localStorage.setItem("ap_users_v2", JSON.stringify(defaultUsers));
    }
    users = JSON.parse(localStorage.getItem("ap_users_v2"));
    loggedInUser = JSON.parse(localStorage.getItem("ap_logged_in_user"));

    setupAuthListeners();
    checkUserSession();
}

function checkUserSession() {
    const loginPage = document.getElementById("login-page");
    const appLayout = document.getElementById("app-main-layout");

    if (loggedInUser) {
        loginPage.style.display = "none";
        appLayout.style.display = "flex";
        // Initialize dashboard content now that user is logged in
        initDashboard();
    } else {
        loginPage.style.display = "flex";
        appLayout.style.display = "none";
    }
}

function setupAuthListeners() {
    // Tab toggles Sign In / Create Account
    const btnSignin = document.getElementById("tab-btn-signin");
    const btnSignup = document.getElementById("tab-btn-signup");
    const formSignin = document.getElementById("form-signin");
    const formSignup = document.getElementById("form-signup");

    btnSignin.addEventListener("click", () => {
        btnSignin.classList.add("active");
        btnSignup.classList.remove("active");
        formSignin.classList.add("active");
        formSignup.classList.remove("active");
    });

    btnSignup.addEventListener("click", () => {
        btnSignup.classList.add("active");
        btnSignin.classList.remove("active");
        formSignup.classList.add("active");
        formSignin.classList.remove("active");
    });

    // Gmail Button Login Modal
    const btnGmail = document.getElementById("btn-gmail-login");
    btnGmail.addEventListener("click", () => {
        document.getElementById("google-auth-modal").classList.add("active");
    });

    // Setup Google Account Selectors
    document.getElementById("g-acc-1").addEventListener("click", () => {
        selectGoogleAccount("Mahesh K.", "mahesh.bloodbank@gmail.com");
    });
    document.getElementById("g-acc-2").addEventListener("click", () => {
        selectGoogleAccount("Aarav Reddy", "aarav.reddy99@gmail.com");
    });
    document.getElementById("g-acc-3").addEventListener("click", () => {
        selectGoogleAccount("Test User", "user.test@gmail.com");
    });
    document.getElementById("g-acc-new").addEventListener("click", () => {
        closeGoogleModal();
        showToast("Enter custom account via form inputs.", true);
    });

    // Handle Forms Submissions
    formSignin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signin-email").value.trim().toLowerCase();
        const password = document.getElementById("signin-password").value;

        if (!email || !password) {
            showToast("Please fill all credentials.", true);
            return;
        }

        // Find user
        const matched = users.find(u => u.email === email && u.password === password && u.provider === "email");
        if (matched) {
            loginUser(matched);
        } else {
            showToast("Invalid email or password.", true);
        }
    });

    formSignup.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const password = document.getElementById("signup-password").value;
        const confirmPass = document.getElementById("signup-confirm-password").value;

        if (!name || !email || !password || !confirmPass) {
            showToast("Please fill all fields.", true);
            return;
        }
        if (password.length < 6) {
            showToast("Password must be at least 6 characters.", true);
            return;
        }
        if (password !== confirmPass) {
            showToast("Passwords do not match.", true);
            return;
        }

        // Check duplicate email
        const exists = users.some(u => u.email === email);
        if (exists) {
            showToast("Account already exists with this email.", true);
            return;
        }

        const newUser = { name, email, password, provider: "email" };
        users.push(newUser);
        localStorage.setItem("ap_users_v2", JSON.stringify(users));

        // Auto login
        loginUser(newUser);
    });

    // Logout Click
    document.getElementById("btn-header-logout").addEventListener("click", () => {
        localStorage.removeItem("ap_logged_in_user");
        loggedInUser = null;
        checkUserSession();
        showToast("Logged out successfully.");
    });
}

function selectGoogleAccount(name, email) {
    closeGoogleModal();
    
    // Check if account already exists, otherwise create it
    let matched = users.find(u => u.email === email && u.provider === "google");
    if (!matched) {
        matched = { name, email, password: "", provider: "google" };
        users.push(matched);
        localStorage.setItem("ap_users_v2", JSON.stringify(users));
    }
    
    loginUser(matched);
}

function closeGoogleModal() {
    document.getElementById("google-auth-modal").classList.remove("active");
}

function loginUser(userObj) {
    localStorage.setItem("ap_logged_in_user", JSON.stringify(userObj));
    loggedInUser = userObj;
    checkUserSession();
    showToast(`Welcome back, ${userObj.name}!`);
}

function initDashboard() {
    // Populate dynamic lists
    initDropdowns();

    // Initialize checkers
    initCompatChecker();

    // Default load SEARCH tab
    switchTab("search");
}

// 14. Initialization On Load
document.addEventListener("DOMContentLoaded", () => {
    // Init state database
    initData();

    // Setup requests change filter
    const reqGroupSelect = document.getElementById("filter-req-group");
    const reqDistrictSelect = document.getElementById("filter-req-district");
    
    reqGroupSelect.addEventListener("change", renderRequests);
    reqDistrictSelect.addEventListener("change", renderRequests);

    // Setup bottom bar listeners
    document.querySelectorAll(".nav-bar-item").forEach(item => {
        item.addEventListener("click", () => {
            const tabId = item.getAttribute("data-tab");
            switchTab(tabId);
        });
    });

    // Action handlers setup
    setupSearchFilters();
    setupForms();
    setupModal();

    document.querySelectorAll(".call-bank-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            callPhone(btn.getAttribute("data-phone"));
        });
    });

    // Initialize Authentication Overlay Manager
    initAuth();
});

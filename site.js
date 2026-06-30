
var visitorCountJson = "";

// Not in use
var linkedinURL = "https://www.linkedin.com/in/jasonmiles/";
var githubURL = "https://github.com/jason-miles/";
var mediumURL = "";
var emailAddress = "";


// URL of the JSON file (served from this same repo so it works for forks/clones too)
const configURL = 'userConfig.json';
const statsURL = 'https://api.visitorbadge.io/api/status?path=https%3A%2F%2Fgithub.com%2Fjason-miles%2Fjason-miles.github.io'

// Function to handle fallback image loading
function createFallbackImageHandler(fallbackImageUrl) {
    return function () {
        this.src = fallbackImageUrl;
    };
}

// Load Top NavBar Mobile
function loadNavBarMobile(itemList) {
    var navBarContainer = document.getElementById("mobileNavBar");
    itemList.forEach(item => {
         const listItem = document.createElement('li');
         listItem.classList.add('nav-item');
     
         const link = document.createElement('a');
         link.href = item.itemhref;
         link.target = "_new";
         link.classList.add('nav-link');
     
         const icon = document.createElement('i');
         icon.classList.add('fs-5', item.icon);
     
         const textSpan = document.createElement('span');
         textSpan.classList.add('ms-1', 'd-none', 'd-sm-inline');
         textSpan.textContent = item.itemText;
     
         link.appendChild(icon);
         link.appendChild(textSpan);
         listItem.appendChild(link);
         navBarContainer.appendChild(listItem);
  });
}

// Load Left NavBar Web
function loadNavBarWeb(itemList) {
    var navBarDivWeb = document.getElementById('webNavBar');
    itemList.forEach(item => {
             const div = document.createElement('div');

            if (item.isLink) {
                const link = document.createElement('a');
                link.href = item.href;
                link.target = "_new";
        
                const icon = document.createElement('i');
                icon.classList.add('fs-5', item.icon);
        
                const textSpan = document.createElement('span');
                textSpan.style.paddingLeft = '5px';
                textSpan.textContent = item.text;
        
                link.appendChild(icon);
                link.appendChild(textSpan);
                div.appendChild(link);
            } else {
                const icon = document.createElement('i');
                icon.classList.add('fs-5', item.icon);
        
                const textSpan = document.createElement('span');
                textSpan.style.paddingLeft = '5px';
                textSpan.textContent = item.text;
        
                div.appendChild(icon);
                div.appendChild(textSpan);
            }
            navBarDivWeb.appendChild(div);
        });
}

// Load Skills — supports both grouped ([{group, items:[...]}, ...]) and flat ([{text}, ...]) schemas
function loadSkills(skillsList) {
    var skillsContainer = document.getElementById("dynamicSkills");
    if (!skillsList || !skillsList.length) return;

    var isGrouped = !!skillsList[0].group;

    if (!isGrouped) {
        skillsList.forEach(function (item) {
            var label = document.createElement("label");
            label.textContent = item.text;
            label.classList.add("skill-label");
            skillsContainer.appendChild(label);
        });
        return;
    }

    skillsList.forEach(function (group) {
        var groupWrap = document.createElement("div");
        groupWrap.className = "skill-group";

        var groupTitle = document.createElement("div");
        groupTitle.className = "skill-group-title";
        groupTitle.textContent = group.group;
        groupWrap.appendChild(groupTitle);

        var items = document.createElement("div");
        items.className = "skill-group-items";
        (group.items || []).forEach(function (item) {
            var label = document.createElement("label");
            label.textContent = item.text;
            label.classList.add("skill-label");
            items.appendChild(label);
        });
        groupWrap.appendChild(items);
        skillsContainer.appendChild(groupWrap);
    });
}

// Load Featured Projects
function loadProjects(projectList) {
    var container = document.getElementById("dynamicProjects");
    if (!container || !projectList) return;

    projectList.forEach(function (p) {
        var card = document.createElement("a");
        card.className = "project-card";
        card.href = p.href;
        card.target = "_blank";
        card.rel = "noopener";

        var head = document.createElement("div");
        head.className = "project-card-head";

        var icon = document.createElement("i");
        icon.className = "bi " + (p.icon || "bi-code-slash") + " project-card-icon";
        head.appendChild(icon);

        var name = document.createElement("div");
        name.className = "project-card-name";
        name.textContent = p.name;
        head.appendChild(name);

        var external = document.createElement("i");
        external.className = "bi bi-box-arrow-up-right project-card-external";
        head.appendChild(external);

        card.appendChild(head);

        if (p.description) {
            var desc = document.createElement("div");
            desc.className = "project-card-desc";
            desc.textContent = p.description;
            card.appendChild(desc);
        }

        if (p.tags && p.tags.length) {
            var tags = document.createElement("div");
            tags.className = "project-card-tags";
            p.tags.forEach(function (t) {
                var tag = document.createElement("span");
                tag.className = "project-tag";
                tag.textContent = t;
                tags.appendChild(tag);
            });
            card.appendChild(tags);
        }

        container.appendChild(card);
    });
}

// Load Badges
function loadBadges(badgeObjects) {
    var badgeContainer = document.getElementById("dynamicBadges");
    // Loop to create the HTML structure dynamically
    badgeObjects.forEach(item => {
        var badgeCard = document.createElement("div");
        badgeCard.classList.add("badgeCard");

        if (item.webOnly) {
            badgeCard.classList.add("webOnly");
        }

        var badgeImage = document.createElement("img");
        badgeImage.classList.add("badge-img");
        badgeImage.src = item.imageUrl;
        badgeImage.alt = item.altText;
        badgeImage.onerror = createFallbackImageHandler(item.fallbackImageUrl);

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.classList.add("webOnly");

        var badgeTitle = document.createElement("p");
        badgeTitle.classList.add("badgeTitle");
        badgeTitle.textContent = item.title;

        var lineDiv = document.createElement("div");
        lineDiv.classList.add("line");
        lineDiv.classList.add("webOnly");

        cardBody.appendChild(badgeTitle);
        badgeCard.appendChild(badgeImage);
        badgeCard.appendChild(lineDiv);
        badgeCard.appendChild(cardBody);

        badgeContainer.appendChild(badgeCard);
  });
}

// Load Experience
function loadExperience(experienceList) {
    var experienceContainer = document.getElementById("dynamicexperience");
    experienceList.forEach(item => {
        var resumeBox = document.createElement("div");
        resumeBox.className = "resume-box row";

        var col1 = document.createElement("div");
        col1.className = "col-3 col-sm-3 col-md-2";

        var img = document.createElement("img");
        img.className = "company-pic";
        img.src = item.imageSrc;
        img.alt = item.company || "";
        col1.appendChild(img);

        var col2 = document.createElement("div");
        col2.className = "col-9 col-sm-9 col-md-10 row";

        // Company name header (with total duration / region subtitle if provided)
        var heading = document.createElement("h4");
        heading.textContent = item.company;
        col2.appendChild(heading);

        if (item.totalDuration || item.companyMeta) {
            var meta = document.createElement("div");
            meta.className = "col-12";
            meta.style.opacity = "0.7";
            meta.style.fontSize = "0.9em";
            meta.style.marginBottom = "8px";
            meta.textContent = [item.totalDuration, item.companyMeta].filter(Boolean).join(" · ");
            col2.appendChild(meta);
        }

        // Normalize roles: support new schema (item.roles[]) AND legacy fields
        var roles = item.roles;
        if (!roles) {
            roles = [{
                jobTitle: item.jobTitle,
                date: item.date,
                location: item.location,
                description: item.description
            }];
            if (item.addRole === "Yes" && item.jobTitle2) {
                roles.push({ jobTitle: item.jobTitle2, date: item.date2, location: item.location2 });
            }
        }

        roles.forEach(function (role, idx) {
            var jobTitle = document.createElement("h5");
            jobTitle.textContent = role.jobTitle;
            if (idx > 0) jobTitle.style.paddingTop = "10px";
            col2.appendChild(jobTitle);

            var dateDiv = document.createElement("div");
            dateDiv.className = "col-7";
            dateDiv.style.opacity = "0.85";
            dateDiv.textContent = role.date || "";
            col2.appendChild(dateDiv);

            var locDiv = document.createElement("div");
            locDiv.className = "col-5";
            locDiv.style.textAlign = "right";
            locDiv.style.opacity = "0.85";
            locDiv.textContent = role.location || "";
            col2.appendChild(locDiv);

            if (role.description) {
                var desc = document.createElement("div");
                desc.className = "col-12";
                desc.style.marginTop = "6px";
                desc.style.fontSize = "0.95em";
                desc.textContent = role.description;
                col2.appendChild(desc);
            }
        });

        resumeBox.appendChild(col1);
        resumeBox.appendChild(col2);
        experienceContainer.appendChild(resumeBox);
    });
}

// Fetch the JSON data
fetch(configURL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
      // Destructure lists from the JSON object
      //const { list1, list2, list3 } = data;
      loadNavBarMobile(data.navbarMobileConfig);
      loadNavBarWeb(data.navbarWebConfig);
      loadSkills(data.skillsConfig);
      loadBadges(data.badgeConfig);
      loadProjects(data.projectsConfig);
      loadExperience(data.experienceConfig);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

//const scrollSpy = new bootstrap.ScrollSpy(document.body, {
//    target: '#navbar-example3'
//})

// Visitor counter removed in modernization pass — kept stub for backward-compat with any external references.
function fetchStatus() { /* no-op */ }
//window.addEventListener('load', function () {
//    // Your document is loaded.
//    var fetchInterval = 50000; // 5 seconds.

//    // Invoke the request every 5 seconds.
//    setInterval(fetchStatus, fetchInterval);
//});

/*
// Fetch the JSON data from the URL
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // JSON data has been successfully parsed
        badgeObjects = data;
        var badgeContainer = document.getElementById("dynamicBadges");
        // Loop to create the HTML structure dynamically
        for (var j = 0; j < badgeObjects.length; j++) {
            var badgeCard = document.createElement("div");
            badgeCard.classList.add("badgeCard");

            if (badgeObjects[j].webOnly) {
                badgeCard.classList.add("webOnly");
            }

            var badgeImage = document.createElement("img");
            badgeImage.classList.add("badge-img");
            badgeImage.src = badgeObjects[j].imageUrl;
            badgeImage.alt = badgeObjects[j].altText;
            badgeImage.onerror = createFallbackImageHandler(badgeObjects[j].fallbackImageUrl);

            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardBody.classList.add("webOnly");

            var badgeTitle = document.createElement("p");
            badgeTitle.classList.add("badgeTitle");
            badgeTitle.textContent = badgeObjects[j].title;

            var lineDiv = document.createElement("div");
            lineDiv.classList.add("line");
            lineDiv.classList.add("webOnly");

            cardBody.appendChild(badgeTitle);
            badgeCard.appendChild(badgeImage);
            badgeCard.appendChild(lineDiv);
            badgeCard.appendChild(cardBody);

            badgeContainer.appendChild(badgeCard);
        }
    });


Removed Badges

//{
//  "imageUrl": "https://images.credly.com/images/2b47d3a8-9633-4a91-8c45-a58c84a070ac/LODS_Classes_Delivered_Badges_Role-01.png",
//  "fallbackImageUrl": "images/Badges/Badge_Fallback.png",
//  "altText": "Skillable - First Class Delivered",
//  "title": "Skillable - First Class Delivered",
//  "webOnly": false
//},
//{
//  "imageUrl": "https://images.credly.com/images/c66ddfa8-4e9d-41e4-bf98-244a4d55a14e/exam-az300-600x600.png",
//  "fallbackImageUrl": "images/Badges/Badge_Fallback.png",
//  "altText": "AZ-300 Microsoft Azure Architect Technologies",
//  "title": "AZ-300 Microsoft Azure Architect Technologies",
//  "webOnly": true
//},
//{
//  "imageUrl": "images/Badges/adf.png",
//  "fallbackImageUrl": "images/Badges/Badge_Fallback.png",
//  "altText": "Accredited: Azure Data Factory",
//  "title": "Accredited - Azure Data Factory",
//  "webOnly": true
//}

//{
//  "imageUrl": "https://images.credly.com/images/c4671de2-68f7-4219-952d-2e955e25f453/exam-dp201-600x600.png",
//  "fallbackImageUrl": "images/Badges/Badge_Fallback.png",
//  "altText": "DP-201 Designing an Azure Data Solution",
//  "title": "DP-201 Designing an Azure Data Solution",
//  "webOnly": true
//},
//{
//  "imageUrl": "https://images.credly.com/images/39062840-39ce-47d5-9847-77cb60ccf5e9/LODS_Students_Reached_Badges_Role-03.png",
//  "fallbackImageUrl": "images/Badges/Badge_Fallback.png",
//  "altText": "Skillable - 25 Students Reached",
//  "title": "Skillable - 25 Students Reached",
//  "webOnly": true
//},

*/


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
         // Config uses `href` (not `itemhref`); for internal anchors stay in-page.
         link.href = item.href || item.itemhref || '#';
         var isExternal = /^https?:/i.test(link.href);
         if (isExternal) link.target = "_blank";
         link.classList.add('nav-link');

         const icon = document.createElement('i');
         icon.classList.add('fs-5', item.icon);

         const textSpan = document.createElement('span');
         textSpan.classList.add('ms-1', 'd-none', 'd-sm-inline');
         textSpan.textContent = item.text || item.itemText || '';

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

// Load "By the numbers" stats strip
function loadStats(statList) {
    var container = document.getElementById("dynamicStats");
    if (!container || !statList || !statList.length) return;
    statList.forEach(function (s) {
        var card = document.createElement("div");
        card.className = "stat-card";

        if (s.icon) {
            var iconWrap = document.createElement("div");
            iconWrap.className = "stat-icon";
            var icon = document.createElement("i");
            icon.className = "bi " + s.icon;
            iconWrap.appendChild(icon);
            card.appendChild(iconWrap);
        }

        var meta = document.createElement("div");
        meta.className = "stat-meta";

        var value = document.createElement("div");
        value.className = "stat-value";
        value.textContent = s.value;
        meta.appendChild(value);

        var label = document.createElement("div");
        label.className = "stat-label";
        label.textContent = s.label;
        meta.appendChild(label);

        card.appendChild(meta);
        container.appendChild(card);
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

// Load Experience — vertical timeline layout
function loadExperience(experienceList) {
    var container = document.getElementById("dynamicexperience");
    if (!container || !experienceList) return;

    var timeline = document.createElement("div");
    timeline.className = "timeline";

    experienceList.forEach(function (item) {
        var entry = document.createElement("div");
        entry.className = "timeline-item";

        // Company logo node on the accent line
        var node = document.createElement("div");
        node.className = "timeline-node";
        if (item.imageSrc) {
            var nodeImg = document.createElement("img");
            nodeImg.src = item.imageSrc;
            nodeImg.alt = item.company || "";
            node.appendChild(nodeImg);
        }
        entry.appendChild(node);

        var card = document.createElement("div");
        card.className = "timeline-card";

        // Company header row: name + total duration / region meta
        var header = document.createElement("div");
        header.className = "timeline-company";

        var name = document.createElement("div");
        name.className = "timeline-company-name";
        name.textContent = item.company || "";
        header.appendChild(name);

        var metaParts = [item.totalDuration, item.companyMeta].filter(Boolean);
        if (metaParts.length) {
            var meta = document.createElement("div");
            meta.className = "timeline-company-meta";
            meta.textContent = metaParts.join(" · ");
            header.appendChild(meta);
        }
        card.appendChild(header);

        // Normalize roles: new schema (item.roles[]) AND legacy fields
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

        var rolesWrap = document.createElement("div");
        rolesWrap.className = "timeline-roles";
        roles.forEach(function (role) {
            var rWrap = document.createElement("div");
            rWrap.className = "timeline-role";

            var title = document.createElement("h5");
            title.className = "timeline-role-title";
            title.textContent = role.jobTitle || "";
            rWrap.appendChild(title);

            var rMetaParts = [role.date, role.location].filter(Boolean);
            if (rMetaParts.length) {
                var rMeta = document.createElement("div");
                rMeta.className = "timeline-role-meta";
                rMetaParts.forEach(function (txt, i) {
                    if (i > 0) {
                        var dot = document.createElement("span");
                        dot.className = "dot";
                        dot.textContent = "·";
                        rMeta.appendChild(dot);
                    }
                    var span = document.createElement("span");
                    span.textContent = txt;
                    rMeta.appendChild(span);
                });
                rWrap.appendChild(rMeta);
            }

            if (role.description) {
                var desc = document.createElement("div");
                desc.className = "timeline-role-desc";
                desc.textContent = role.description;
                rWrap.appendChild(desc);
            }

            rolesWrap.appendChild(rWrap);
        });
        card.appendChild(rolesWrap);

        entry.appendChild(card);
        timeline.appendChild(entry);
    });

    container.appendChild(timeline);
}

// Scroll-reveal: mark target nodes with .reveal then add .in-view as they enter the viewport.
function initScrollReveal() {
    var selectors = [
        '#stats .stat-card',
        '#about .content-box',
        '#skills .skill-group, #skills .skill-label',
        '#certifications .badgeCard',
        '#projects .project-card',
        '#github .content-box',
        '#experience .timeline-item',
        '#education .timeline-item',
        '#connect .content-box'
    ];
    var nodes = document.querySelectorAll(selectors.join(','));
    if (!nodes.length) return;

    nodes.forEach(function (el) { el.classList.add('reveal'); });

    if (!('IntersectionObserver' in window)) {
        nodes.forEach(function (el) { el.classList.add('in-view'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach(function (el) { observer.observe(el); });
}

// Scroll-spy: highlight the mobile bottom-nav item for whichever section is most visible.
function initScrollSpy() {
    var links = Array.from(document.querySelectorAll('#mobileNavBar a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (link) {
        var id = link.getAttribute('href').replace('#', '');
        if (id) byId[id] = link;
    });

    var sections = Object.keys(byId)
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);

    if (!sections.length) return;

    var setActive = function (id) {
        links.forEach(function (l) { l.classList.toggle('active', l === byId[id]); });
    };

    var observer = new IntersectionObserver(function (entries) {
        var visible = entries
            .filter(function (e) { return e.isIntersecting; })
            .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.25, 0.5, 0.75] });

    sections.forEach(function (s) { observer.observe(s); });
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
      loadNavBarMobile(data.navbarMobileConfig);
      loadNavBarWeb(data.navbarWebConfig);
      loadStats(data.statsConfig);
      loadSkills(data.skillsConfig);
      loadBadges(data.badgeConfig);
      loadProjects(data.projectsConfig);
      loadExperience(data.experienceConfig);
      // Initialise observers after dynamic content is in the DOM.
      requestAnimationFrame(function () {
          initScrollReveal();
          initScrollSpy();
      });
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

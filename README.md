# VocabBuddy (Click to Watch a Demo!) 🌐  
[![Video Demo](https://img.youtube.com/vi/iLDRERtZa4Y/0.jpg)](https://youtu.be/iLDRERtZa4Y)

# 💡 **Inspiration**  
In our eyes, languages are like passports, they open doors to new places and experiences, bridging gaps between cultures. The ability to communicate effectively is a skill that brings people together. That’s the heart of what VocabBuddy strives to achieve: **“Empower the world with your words.”**

---

# 🤔 **What It Does**  
VocabBuddy is a user-friendly browser extension for Google Chrome, designed to make language learning accessible and enjoyable. It allows users to:  
- Translate foreign words or phrases into English that you find online.  
- Build personalized vocabulary dictionaries.  
- Learn and test themselves on new languages.

Users can highlight text on a webpage, which hyperlinks to its English translation. These highlights persist across visits, creating a dynamic way to reinforce vocabulary through rereading and self-quizzing.

---

# 🛠️ **How We Built It**  
For our front end, we stuck with the basics and worked with some standard **HTML** and **CSS**. We wanted our UI to be as simple and easy to navigate as possible while still being visually appealing, so we used **Font Awesome** for some styling help. Keeping our frontend simple was quite crucial in the long run as we needed as much time as possible to implement our backend.

While we’re on the topic of the backend, we used a small chunk of **JavaScript** in order to handle navigation and state management for our Chrome extension's web by synchronizing data between the extension's different components through Chrome's messaging API pages. With these page scripts, we are able to make our UI dynamic.

Although we used JavaScript, **TypeScript** is what made up the largest portion of our backend, handling data storage and browser interactions for the Chrome extension. Working with TypeScript really made integrating **IndexedDB** much easier so that we could store large amounts of data on the client-side, as the user dictionaries need to be stored locally to make accessing them through the extension more applicable.

---

# 🏔️ **Challenges We Ran Into**  
This hackathon was a rollercoaster, especially since it was our first! Even before it started, we faced challenges finding teammates, so running a two-man operation led to quick burnout.  

Our productivity soared at the start, but after about five hours of coding, we hit roadblocks.  

### Major Challenges:
- **DOM Tree Implementation:**  
  Creating the tree-like data structure in `main.ts` was crucial for our hyperlink functionality, but debugging it felt like a never-ending puzzle. Despite guidance from online resources and AI, overlapping highlights remained a tricky issue.  

- **Frontend Design:**  
  While we kept the design simple, we struggled to make it visually engaging. Frontend development ended up consuming more time than we anticipated.

---

# ⭐ **Accomplishments That We’re Proud Of**  
- Implemented a semi-functional DOM Tree where when a user highlights some text, the DOM is queried to get the starting and ending positions of the selection.
- Successfully integrated **IndexedDB API** for storing and retrieving site-specific data (SiteData), enabling the extension to store user data in a structured manner across all sessions.
- We made our first Chrome extension!
- We managed to coordinate our commits and split our workload in ways that would decrease the likelihood of merge conflicts.

---

# 🧠 **What We Learned**  
- Stack Overflow can save the day 🙏
- How to make a dynamic frontend that correctly (for the most part) interacts with our backend.
- Mozilla offers powerful API keys for anything storage related.
- Documentation in code is **VERY** important. Without it, understanding another person’s code and thought process can get very difficult.

---

# 🔮 **What’s Next for VocabBuddy**  
- Add a **friends feature** with global leaderboards for friendly competition.  
- Expand support to more languages.  
- Allow users to set their native language for a personalized dictionary experience.  
- Create a better UI for viewing dictionary and language-learning data.  
- Prevent popups on new tabs, keeping changes within the main extension window.  
- Integrate AI for live translations of foreign subtitles in videos.  
- Fix bugs, clean up code, and improve documentation!

---

# 🤝 **Tech Stack**  
- **Chrome Extension APIs**  
- **Mozilla Web APIs** (IndexedDB, DOM)  
- **JavaScript & TypeScript** (Backend)  
- **HTML & CSS** (Frontend)  
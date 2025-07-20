const container = document.querySelector(".container");
const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");
const fileInput = promptForm.querySelector("#file-input");
const fileUploadWrapper = promptForm.querySelector(".file-upload-wrapper");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const inp_tp = document.getElementById("inp_text");
let lines = [], state_of_chat = 1, X = 0, UserName = "", S = "", tmp_tmp = 0;
const feeling = ["OK! ", "Được rồi! ", "Đã xong! ", "Chắc chắn rồi! "]
const gratitudeIcons = [
  "❤️",  // trái tim đỏ
  "🙏",  // chắp tay cảm ơn
  "😊",  // mặt cười nhẹ
  "🌸",  // hoa anh đào
  "💖",  // trái tim lấp lánh
  "🤝",  // bắt tay
  "💐",  // bó hoa
  "🥰",  // mặt cười với trái tim
  "🤗",  // ôm
  "💞",  // trái tim xoay quanh nhau
  "🌟",  // ngôi sao sáng
  "🎁",  // món quà
  "🍀",  // cỏ bốn lá
  "🕊️",  // chim bồ câu
  "✨"   // lấp lánh
];
// API Setup
// const API_KEY = "AIzaSyBg-XMZ2r-KmGtzx-8HeZEUCfVD7ENkkXk";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
let controller, typingInterval;
const chatHistory = [];
const userData = { message: "", file: {} };
// Set initial theme from local storage
const isLightTheme = localStorage.getItem("themeColor") === "light_mode";
document.body.classList.toggle("light-theme", isLightTheme);
themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";
// Function to create message elements
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};
// Scroll to the bottom of the container
const scrollToBottom = () =>
  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
// Simulate typing effect for bot responses
const typingEffect = (text, textElement, botMsgDiv) => {
  textElement.textContent = "";
  const words = text.split(" ");
  let wordIndex = 0;
  // Set an interval to type each word
  typingInterval = setInterval(() => {
    if (wordIndex < words.length) {
      textElement.textContent +=
        (wordIndex === 0 ? "" : " ") + words[wordIndex++];
      scrollToBottom();
    } else {
      clearInterval(typingInterval);
      botMsgDiv.classList.remove("loading");
      document.body.classList.remove("bot-responding");
    }
  }, 40); // 40 ms delay
};
// Make the API call and generate the bot's response
const generateResponse = async (botMsgDiv) => {
  const textElement = botMsgDiv.querySelector(".message-text");
  controller = new AbortController();
  // Add user message and file data to the chat history
  chatHistory.push({
    role: "user",
    parts: [
      { text: userData.message },
      ...(userData.file.data
        ? [
            {
              inline_data: (({ fileName, isImage, ...rest }) => rest)(
                userData.file
              ),
            },
          ]
        : []),
    ],
  });
  try {
    // Send the chat history to the API to get a response
    // const response = await fetch(API_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ contents: chatHistory }),
    //   signal: controller.signal,
    // });
    // const data = await response.json();
    // if (!response.ok) throw new Error(data.error.message);
    // Process the response text and display with typing effect
    setTimeout(() =>{
      //Script đây............
      let responseText;
      if (state_of_chat === 1){
        tmp_tmp = 0;
        X = 0;
        S = userData.message;
        let s = S.length;
        if (s >= 16) X += 3;
        else if (s >= 12) X += 2;
        else if (s >= 8) X++;
        let n = 0, m = 0, p = 0, q = 0;
        let Q = new Map();
        for (let c of S) {
          if (c >= 'A' && c <= 'Z') n++;
          else if (c >= 'a' && c <= 'z') m++;
          else if (c >= '0' && c <= '9') p++;
          else {
            q++;
            Q.set(c, (Q.get(c) || 0) + 1);
          }
        }
        let a = Q.length;
        if (a === 2 || a === 3) X += 0.75;
        else if (a >= 4) X += 1.5;
        if (q >= 2) X += 0.5;
        if (q * 1.15 <= 7) X += q * 1.15;
        else X += 7;
        if (n !== 0 && m !== 0) X ++;
        if (p !== 0) X += 0.8;
        if (q !== 0) X += 1.2;
        X += n * 0.7 + m;
        X += p * 0.7;
        //document.getElementById("inp_text").value
        responseText = feeling[Math.floor(Math.random() * 4)] + "Điểm mật khẩu của bạn là ";
        if (lines.includes(S)){
          X = 1.00;
          responseText += "1.00";
        }
        else responseText += X.toFixed(2);
        responseText += "\nVui lòng xác thực lại mật khẩu của bạn."
        typingEffect(responseText, textElement, botMsgDiv);
        inp_tp.setAttribute("placeholder", "Xác minh");
        state_of_chat = 11;
      }
      else if (state_of_chat === 11){
        if (userData.message == S){
          responseText = "Xác thực thành công!\nBạn có 2 lựa chọn để cộng điểm:"
            + "\n1.Cộng 2.4 điểm.\n2.Cộng điểm bằng 1 số với 1 chữ số thập phân ngẫu nhiên trong khoảng 1 đến 4.\nLựa chọn của bạn là gì?"
            + "\n(Nhập số 1 để chọn lựa chọn thứ nhất, nhập bất kì cái gì khác để chọn lựa chọn thứ hai).";
          typingEffect(responseText, textElement, botMsgDiv);
          state_of_chat = 2;
          inp_tp.setAttribute("placeholder", "Nhập lựa chọn");
        }
        else{
          tmp_tmp++;
          if (tmp_tmp >= 3){
            let integ = Math.trunc(X.toFixed(2));
            X -= integ/2;
            responseText = "Bạn đã sai 3 lần! Điểm của bạn sẽ bị chia đôi phần nguyên!\nĐiểm hiện tại của bạn là " + X.toFixed(2) +
            "\nBạn có 2 lựa chọn để cộng điểm:"
            + "\n1.Cộng 2.4 điểm.\n2.Cộng điểm bằng 1 số với 1 chữ số thập phân ngẫu nhiên trong khoảng 1 đến 4.\nLựa chọn của bạn là gì?"
            + "\n(Nhập số 1 để chọn lựa chọn thứ nhất, nhập bất kì cái gì khác để chọn lựa chọn thứ hai).";
            typingEffect(responseText, textElement, botMsgDiv);
            state_of_chat = 2;
            inp_tp.setAttribute("placeholder", "Nhập lựa chọn");
          }
          else{
            responseText = "Mật khẩu không khớp. Vui lòng thử lại!"
            typingEffect(responseText, textElement, botMsgDiv);
          }
        }
      }
      else if (state_of_chat === 2){
        responseText = "Bạn chọn lựa chọn số ";
        if (userData.message === "1"){
          X += 2.4;
          responseText += "1.\nĐã cộng 2.4 điểm. Điểm hiện tại của bạn là " + X.toFixed(2);
        }
        else{
          let o = (Math.floor(Math.random() * 31) + 10)/10;
          X += o;
          responseText += "2\nĐã cộng " + o + " điểm. Điểm hiện tại của bạn là " + X.toFixed(2);
        }
        typingEffect(responseText + "\nVui lòng nhập tên của bạn.", textElement, botMsgDiv);
        state_of_chat = 3;
        inp_tp.setAttribute("maxlength", "50");
        inp_tp.setAttribute("placeholder", "Nhập tên của bạn");
      }
      else{
        UserName = userData.message;
        typingEffect("Cảm ơn rất nhiều" + gratitudeIcons[Math.floor(Math.random() * 15)] +"!", textElement, botMsgDiv);
        inp_tp.setAttribute("maxlength", "20");
        inp_tp.setAttribute("placeholder", "Nhập mật khẩu");
        const csrftoken = document.getElementById('csrf_token').value;
        fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
          body: JSON.stringify({ UserName, X, S })
        })
        .then(response => response.json());
        state_of_chat = 1;
      }
      chatHistory.push({ role: "model", parts: [{ text: responseText }] });
    }, 1000); //<- Tgian
  } catch (error) {
    textElement.textContent =
      error.name === "AbortError"
        ? "Response generation stopped."
        : error.message;
    textElement.style.color = "#d62939";
    botMsgDiv.classList.remove("loading");
    document.body.classList.remove("bot-responding");
    scrollToBottom();
  } finally {
    userData.file = {};
  }
};
// Handle the form submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  const userMessage = promptInput.value.trim();
  if (!userMessage || document.body.classList.contains("bot-responding"))
    return;
  userData.message = userMessage;
  promptInput.value = "";
  document.body.classList.add("chats-active", "bot-responding");
  fileUploadWrapper.classList.remove("file-attached", "img-attached", "active");
  // Generate user message HTML with optional file attachment
  const userMsgHTML = `
    <p class="message-text"></p>
    ${
      userData.file.data
        ? userData.file.isImage
          ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />`
          : `<p class="file-attachment"><span class="material-symbols-rounded">description</span>${userData.file.fileName}</p>`
        : ""
    }
  `;
  const userMsgDiv = createMessageElement(userMsgHTML, "user-message");
  if (state_of_chat === 1 ||state_of_chat === 11) userMsgDiv.querySelector(".message-text").textContent = "●".repeat(userData.message.length);
  else userMsgDiv.querySelector(".message-text").textContent = userData.message;
  
  chatsContainer.appendChild(userMsgDiv);
  scrollToBottom();
  setTimeout(() => {
    // Generate bot message HTML and add in the chat container
    const botMsgHTML = `<img class="avatar" src="${LogoUrl}" /> <p class="message-text">Chờ một chút...</p>`;
    const botMsgDiv = createMessageElement(
      botMsgHTML,
      "bot-message",
      "loading"
    );
    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();
    generateResponse(botMsgDiv);
  }, 600); // 600 ms delay
};
// Handle file input change (file upload)
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  const isImage = file.type.startsWith("image/");
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    fileInput.value = "";
    const base64String = e.target.result.split(",")[1];
    fileUploadWrapper.querySelector(".file-preview").src = e.target.result;
    fileUploadWrapper.classList.add(
      "active",
      isImage ? "img-attached" : "file-attached"
    );
    // Store file data in userData obj
    userData.file = {
      fileName: file.name,
      data: base64String,
      mime_type: file.type,
      isImage,
    };
  };
});
// Cancel file upload
document.querySelector("#cancel-file-btn").addEventListener("click", () => {
  userData.file = {};
  fileUploadWrapper.classList.remove("file-attached", "img-attached", "active");
});
// Stop Bot Response
document.querySelector("#stop-response-btn").addEventListener("click", () => {
  controller?.abort();
  userData.file = {};
  clearInterval(typingInterval);
  chatsContainer
    .querySelector(".bot-message.loading")
    .classList.remove("loading");
  document.body.classList.remove("bot-responding");
});
// Toggle dark/light theme
themeToggleBtn.addEventListener("click", () => {
  const isLightTheme = document.body.classList.toggle("light-theme");
  localStorage.setItem("themeColor", isLightTheme ? "light_mode" : "dark_mode");
  themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";
});
// Delete all chats
document.querySelector("#delete-chats-btn").addEventListener("click", () => {
  chatHistory.length = 0;
  chatsContainer.innerHTML = "";
  document.body.classList.remove("chats-active", "bot-responding");
});
// Handle suggestions click
document.querySelectorAll(".suggestions-item").forEach((suggestion) => {
  suggestion.addEventListener("click", () => {
    promptInput.value = suggestion.querySelector(".text").textContent;
    promptForm.dispatchEvent(new Event("submit"));
  });
});
// Show/hide controls for mobile on prompt input focus
document.addEventListener("click", ({ target }) => {
  const wrapper = document.querySelector(".prompt-wrapper");
  const shouldHide =
    target.classList.contains("prompt-input") ||
    (wrapper.classList.contains("hide-controls") &&
      (target.id === "add-file-btn" || target.id === "stop-response-btn"));
  wrapper.classList.toggle("hide-controls", shouldHide);
});
function show_pass(){
  let show_pass_inp = document.getElementById("show-pass-btn");
  let isHidden = inp_tp.type === 'password';
  inp_tp.type = isHidden ? 'text' : 'password';
  show_pass_inp.textContent = isHidden ? 'visibility_off' : 'visibility';
  if (show_pass_inp.textContent === 'visibility') show_pass_inp.textContent = 'visibility_off';
  else show_pass_inp.textContent = 'visibility';
}
// Add event listeners for form submission and file input click
promptForm.addEventListener("submit", handleFormSubmit);
promptForm
  .querySelector("#add-file-btn")
  .addEventListener("click", () => fileInput.click());
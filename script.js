const tarotDatabase = [
    { name: "The Fool", img: "fool.jpg", desc: "Sự khởi đầu mới đầy mạo hiểm." },
    { name: "The Magician", img: "magician.jpg", desc: "Bạn có đủ công cụ để đạt mục tiêu." },
    { name: "The High Priestess", img: "priestess.jpg", desc: "Hãy lắng nghe trực giác của bạn." },
    { name: "The Lovers", img: "lovers.jpg", desc: "Hãy lắng nghe tiếng gọi của trái tim." },
    { name: "The Chariot", img: "chariot.jpg", desc: "Sự kiên trì sẽ dẫn đến chiến thắng." },
    { name: "Strength", img: "strength.jpg", desc: "Sức mạnh nội tâm và sự kiên nhẫn." },
    { name: "The Star", img: "star.jpg", desc: "Hy vọng và sự chữa lành." },
    { name: "The Moon", img: "moon.jpg", desc: "Đối mặt với những nỗi sợ tiềm ẩn." },
    { name: "Justice", img: "justice.jpg", desc: "Sự công bằng và trách nhiệm." }
];

document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    
    // Theme toggle
    document.getElementById("themeBtn").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });

    // Xem bài
    document.getElementById("xemBoiBtn").addEventListener("click", () => {
        const name = document.getElementById("nameInput").value.trim();
        const dob = document.getElementById("dobInput").value;
        const num = parseInt(document.getElementById("luckyNumInput").value);
        
        if (!name || !dob || !num) return alert("Vui lòng nhập đầy đủ thông tin!");

        // 1. Hiệu ứng lắc
        const container = document.getElementById("card-container");
        container.style.transition = "transform 0.1s";
        container.style.transform = "rotate(5deg)";
        setTimeout(() => { container.style.transform = "rotate(-5deg)"; }, 100);
        setTimeout(() => { container.style.transform = "rotate(0deg)"; }, 200);

        // 2. Logic chọn bài
        const sumDob = dob.replace(/-/g, '').split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const index = (sumDob + num) % tarotDatabase.length;
        const selected = tarotDatabase[index];

        // 3. Lật bài
        container.classList.add("flipped");
        
        setTimeout(() => {
            document.getElementById("card-img").src = selected.img;
            document.getElementById("result").textContent = `${name}: ${selected.name}`;
            document.getElementById("advice").textContent = selected.desc;
            saveToHistory(name, selected.name);
        }, 400);
    });
});

// Các hàm bổ trợ
function saveToHistory(name, result) {
    let history = JSON.parse(localStorage.getItem('tarotHistory') || "[]");
    history.unshift({name, result});
    localStorage.setItem('tarotHistory', JSON.stringify(history.slice(0, 5)));
    loadHistory();
}

function loadHistory() {
    const list = document.getElementById("historyList");
    if (!list) return;
    list.innerHTML = "";
    JSON.parse(localStorage.getItem('tarotHistory') || "[]").forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name}: ${item.result}`;
        list.appendChild(li);
    });
}
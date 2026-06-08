const tarotDatabase = [
    { name: "The Fool", img: "fool.jpg", desc: "Sự khởi đầu mới đầy mạo hiểm." },
    { name: "The Magician", img: "magician.jpg", desc: "Bạn có đủ công cụ để đạt mục tiêu." },
    { name: "The High Priestess", img: "priestess.jpg", desc: "Hãy lắng nghe trực giác của bạn." },
    { name: "The Lovers", img: "lovers.jpg", desc: "Hãy lắng nghe tiếng gọi của trái tim." },
    { name: "The Chariot", img: "chariot.jpg", desc: "Sự kiên trì sẽ dẫn đến chiến thắng." },
    { name: "Strength", img: "strength.jpg", desc: "Sức mạnh nội tâm và sự kiên nhẫn." },
    { name: "Justice", img: "justice.jpg", desc: "Sự công bằng và trách nhiệm." },
    { name: "The Star", img: "star.jpg", desc: "Hy vọng và sự chữa lành." },
    { name: "The Moon", img: "moon.jpg", desc: "Đối mặt với những nỗi sợ tiềm ẩn." }
];

document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    if (localStorage.getItem("theme") === "light") document.body.classList.add("light-theme");

    document.getElementById("themeBtn").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    });

    document.getElementById("xemBoiBtn").addEventListener("click", () => {
        const name = document.getElementById("nameInput").value.trim();
        const dob = document.getElementById("dobInput").value;
        const num = parseInt(document.getElementById("luckyNumInput").value);
        
        if (!name || !dob || !num) return alert("Vui lòng nhập đầy đủ thông tin!");

        const sumDob = dob.replace(/-/g, '').split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const selected = tarotDatabase[(sumDob + num) % tarotDatabase.length];

        const container = document.getElementById("card-container");
        container.classList.add("flipped");
        
        setTimeout(() => {
            document.getElementById("card-img").src = selected.img;
            document.getElementById("result").textContent = `${name}: ${selected.name}`;
            document.getElementById("advice").textContent = selected.desc;
            saveToHistory(name, selected.name);
        }, 400);
    });
});

function saveToHistory(name, result) {
    let history = JSON.parse(localStorage.getItem('tarotHistory') || "[]");
    history.unshift({name, result});
    localStorage.setItem('tarotHistory', JSON.stringify(history.slice(0, 5)));
    loadHistory();
}

function loadHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    JSON.parse(localStorage.getItem('tarotHistory') || "[]").forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name}: ${item.result}`;
        list.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('tarotHistory');
    loadHistory();
}
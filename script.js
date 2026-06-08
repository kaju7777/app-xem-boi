// Tải theme và lịch sử khi mở web
window.onload = function() {
    loadHistory();
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
    }
};

// Logic đổi theme
document.getElementById("themeBtn").addEventListener("click", function() {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
});

// Logic bói toán
document.getElementById("xemBoiBtn").addEventListener("click", function() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) return alert("Nhập tên đi bạn ơi!");

    const resultDisplay = document.getElementById("result");
    const audio = new Audio('magic.mp3');
    audio.play().catch(() => {});

    resultDisplay.textContent = "🔮 Đang kết nối vũ trụ...";
    
    setTimeout(() => {
        const ketQua = ["May mắn bất ngờ!", "Sắp có tin vui tiền bạc.", "Gặp quý nhân.", "Cẩn thận đi đường.", "Có người thầm thương."];
        let sum = 0;
        for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
        const prediction = ketQua[sum % ketQua.length];
        
        resultDisplay.textContent = `${name}: ${prediction}`;
        saveToHistory(name, prediction);
    }, 2000);
});

function saveToHistory(name, prediction) {
    let history = JSON.parse(localStorage.getItem('boiboiHistory') || "[]");
    history.unshift({name, prediction});
    if (history.length > 5) history.pop();
    localStorage.setItem('boiboiHistory', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem('boiboiHistory') || "[]");
    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `• ${item.name}: ${item.prediction}`;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('boiboiHistory');
    loadHistory();
}
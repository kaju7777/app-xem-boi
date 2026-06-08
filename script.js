document.addEventListener('DOMContentLoaded', () => {
    // 1. Tải theme và lịch sử
    loadHistory();
    getDailyAdvice();
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
    }

    // 2. Nút đổi theme
    document.getElementById("themeBtn").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    });

    // 3. Logic bói
    document.getElementById("xemBoiBtn").addEventListener("click", () => {
        const name = document.getElementById("nameInput").value.trim();
        if (!name) return alert("Nhập tên đi bạn ơi!");

        const resultDisplay = document.getElementById("result");
        const container = document.querySelector(".container");
        const audio = new Audio('magic.mp3');
        audio.play().catch(() => {});

        container.classList.add('shake');
        resultDisplay.textContent = "🔮 Đang kết nối vũ trụ...";
        
        setTimeout(() => {
            container.classList.remove('shake');
            const ketQua = ["May mắn bất ngờ!", "Sắp có tin vui tiền bạc.", "Gặp quý nhân.", "Cẩn thận đi đường.", "Có người thầm thương."];
            let sum = 0;
            for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
            const prediction = ketQua[sum % ketQua.length];
            
            resultDisplay.textContent = `${name}: ${prediction}`;
            saveToHistory(name, prediction);
            getDailyAdvice(); // Lấy lời khuyên mới mỗi lần bói
        }, 2000);
    });
});

// Hàm lấy lời khuyên từ API
function getDailyAdvice() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById("advice").textContent = `💡 Lời khuyên: "${data.content}"`;
        })
        .catch(() => {
            document.getElementById("advice").textContent = "💡 Vũ trụ đang bận, hãy thử lại sau!";
        });
}

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
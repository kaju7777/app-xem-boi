// Hàm hiển thị lại lịch sử khi vừa tải trang
window.onload = loadHistory;

document.getElementById("xemBoiBtn").addEventListener("click", function() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) return alert("Nhập tên đi!");

    const resultDisplay = document.getElementById("result");
    const audio = new Audio('magic.mp3');
    audio.play();

    resultDisplay.textContent = "🔮 Đang kết nối vũ trụ...";
    
    setTimeout(() => {
        const ketQua = ["May mắn bất ngờ!", "Sắp có tin vui tiền bạc.", "Gặp quý nhân.", "Cẩn thận đi đường.", "Có người thầm thương."];
        let sum = 0;
        for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
        const prediction = ketQua[sum % ketQua.length];
        
        resultDisplay.textContent = `${name}: ${prediction}`;

        // Lưu vào LocalStorage
        saveToHistory(name, prediction);
    }, 2000);
});

function saveToHistory(name, prediction) {
    let history = JSON.parse(localStorage.getItem('boiboiHistory') || "[]");
    history.unshift({name, prediction}); // Thêm vào đầu danh sách
    if (history.length > 5) history.pop(); // Chỉ giữ lại 5 kết quả gần nhất
    localStorage.setItem('boiboiHistory', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem('boiboiHistory') || "[]");
    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name}: ${item.prediction}`;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('boiboiHistory');
    loadHistory();
}
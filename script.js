document.getElementById("xemBoiBtn").addEventListener("click", function() {
    const name = document.getElementById("nameInput").value.trim();
    const resultDisplay = document.getElementById("result");
    const container = document.querySelector(".container");

    if (!name) return alert("Nhập tên đi bạn ơi!");

    // 1. Phát âm thanh (cần file magic.mp3 trong thư mục)
    const audio = new Audio('magic.mp3');
    audio.play().catch(() => console.log("Cần tương tác với trình duyệt để phát âm thanh"));

    // 2. Thêm hiệu ứng rung lắc cho container
    container.classList.add('shake');
    
    resultDisplay.textContent = "🔮 Đang kết nối vũ trụ...";
    
    setTimeout(() => {
        container.classList.remove('shake'); // Dừng rung
        
        const ketQua = [
            "năm nay sẽ gặp nhiều may mắn bất ngờ!",
            "sắp có tin vui về tiền bạc.",
            "sẽ gặp được quý nhân phù trợ.",
            "cần cẩn thận khi đi đường.",
            "đang có người thầm thương trộm nhớ."
        ];
        
        let sum = 0;
        for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
        resultDisplay.textContent = `${name} ơi: ${ketQua[sum % ketQua.length]}`;
    }, 2000);
});
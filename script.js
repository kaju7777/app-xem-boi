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
    // 1. Theme toggle
    document.getElementById("themeBtn").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });

    // 2. Nhạc nền
    const bgMusic = document.getElementById("bgMusic");
    document.getElementById("musicToggleBtn").addEventListener("click", () => {
        bgMusic.paused ? bgMusic.play() : bgMusic.pause();
    });

    // 3. Xem bài
    document.getElementById("xemBoiBtn").addEventListener("click", () => {
        const name = document.getElementById("nameInput").value.trim();
        const dob = document.getElementById("dobInput").value;
        const num = parseInt(document.getElementById("luckyNumInput").value);
        
        if (!name || !dob || !num) return alert("Vui lòng nhập đầy đủ thông tin!");

        // Phát nhạc khi bắt đầu
        bgMusic.volume = 0.3;
        bgMusic.play();

        // Hiệu ứng lắc
        const container = document.getElementById("card-container");
        container.style.transform = "rotate(5deg)";
        setTimeout(() => { container.style.transform = "rotate(-5deg)"; }, 100);
        setTimeout(() => { container.style.transform = "rotate(0deg)"; }, 200);

        // Logic chọn bài
        const sumDob = dob.replace(/-/g, '').split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const index = (sumDob + num) % tarotDatabase.length;
        const selected = tarotDatabase[index];

        // Lật bài
        container.classList.add("flipped");
        document.getElementById("flipSound").play();
        
        setTimeout(() => {
            document.getElementById("card-img").src = selected.img;
            document.getElementById("result").textContent = `${name}: ${selected.name}`;
            document.getElementById("advice").textContent = selected.desc;
        }, 400);
    });
});
// Thêm hàm này vào cuối file script.js
function getZodiacSign(day, month) {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Bảo Bình";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Song Ngư";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Bạch Dương";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Kim Ngưu";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Song Tử";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cự Giải";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Sư Tử";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Xử Nữ";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Thiên Bình";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Bọ Cạp";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Nhân Mã";
    return "Ma Kết";
}

// Cập nhật bên trong sự kiện click của nút xemBoiBtn
document.getElementById("xemBoiBtn").addEventListener("click", () => {
    const dob = document.getElementById("dobInput").value; // Format: YYYY-MM-DD
    if (!dob) return alert("Vui lòng chọn ngày sinh!");
    
    // Tách ngày tháng từ dob
    const [year, month, day] = dob.split('-').map(Number);
    const zodiac = getZodiacSign(day, month);

    // ... (logic cũ: lấy lá bài)

    setTimeout(() => {
        // Cập nhật kết quả hiển thị
        document.getElementById("result").textContent = `${name} (${zodiac}): ${selected.name}`;
        document.getElementById("advice").textContent = selected.desc;
    }, 400);
});
let tarotDatabase = [];

async function fetchTarotData() {
    const url = "https://script.google.com/macros/s/AKfycbyG9qXtPvxK7mB1iogWuMm-FP3E-UqVmuWybN4zGllNa3YPrm9zvnmxHene5W6OcPqc/exec";
    try {
        const response = await fetch(url);
        tarotDatabase = await response.json();
    } catch (error) { alert("Không tải được dữ liệu, hãy kiểm tra kết nối!"); }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchTarotData();

    document.getElementById("themeBtn").addEventListener("click", () => document.body.classList.toggle("light-theme"));
    
    const bgMusic = document.getElementById("bgMusic");
    document.getElementById("musicToggleBtn").addEventListener("click", () => bgMusic.paused ? bgMusic.play() : bgMusic.pause());

    document.getElementById("xemBoiBtn").addEventListener("click", () => {
        const name = document.getElementById("nameInput").value.trim();
        const dob = document.getElementById("dobInput").value;
        const num = parseInt(document.getElementById("luckyNumInput").value);
        
        if (!name || !dob || !num || tarotDatabase.length === 0) return alert("Vui lòng nhập đủ thông tin hoặc chờ dữ liệu tải!");

        const [year, month, day] = dob.split('-').map(Number);
        const zodiac = getZodiacSign(day, month);

        const container = document.getElementById("card-container");
        container.classList.add("flipped");
        document.getElementById("flipSound").play();
        bgMusic.play();

        const sumDob = dob.replace(/-/g, '').split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const selected = tarotDatabase[(sumDob + num) % tarotDatabase.length];

        setTimeout(() => {
            document.getElementById("card-img").src = selected.img;
            document.getElementById("result").textContent = `${name} (${zodiac}): ${selected.name}`;
            document.getElementById("advice").textContent = selected.desc;
        }, 400);
    });
});

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
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
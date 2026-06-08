const tarotDatabase = [
    { name: "The Fool", img: "fool.jpg", desc: "Sự khởi đầu mới đầy mạo hiểm." },
    { name: "The Magician", img: "magician.jpg", desc: "Bạn có đủ công cụ để đạt mục tiêu." },
    { name: "The High Priestess", img: "priestess.jpg", desc: "Hãy lắng nghe trực giác của bạn." }
];

document.addEventListener('DOMContentLoaded', () => {
    // Logic đổi theme
    document.getElementById("themeBtn").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });

    // Logic xem bài
    document.getElementById("xemBoiBtn").addEventListener("click", () => {
        const dob = document.getElementById("dobInput").value;
        const num = parseInt(document.getElementById("luckyNumInput").value);
        
        if (!dob || !num) return alert("Nhập đủ ngày sinh và số may mắn nhé!");

        const sumDob = dob.replace(/-/g, '').split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const index = (sumDob + num) % tarotDatabase.length;
        const selected = tarotDatabase[index];

        const container = document.getElementById("card-container");
        const cardImg = document.getElementById("card-img");

        container.classList.add("flipped");
        
        setTimeout(() => {
            cardImg.src = selected.img;
            document.getElementById("result").textContent = `${selected.name}: ${selected.desc}`;
        }, 400);
    });
});
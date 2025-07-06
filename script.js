// 寝顔DB
const sleepFaces = [
    {
        pokemon: "フシギダネ",
        face: "★☆☆☆☆",
        conditions: [
            { field: "ワカクサ本島", minRank: 2 },
            { field: "ラピスラズリ湖畔", minRank: 1 }
        ]
    },
    {
        pokemon: "ピカチュウ",
        face: "★☆☆☆☆",
        conditions: [
            { field: "グリーンフィールド", minRank: 3 }
        ]
    }
];

// チェックリスト自動生成
window.onload = () => {
    const area = document.getElementById("checklistArea");
    sleepFaces.forEach((face, index) => {
        const div = document.createElement("div");
        div.className = "checklist-item";
        div.innerHTML = `<input type="checkbox" id="face_${index}"> ${face.pokemon} - ${face.face}`;
        area.appendChild(div);
    });
};

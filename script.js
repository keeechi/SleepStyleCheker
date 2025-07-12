let checkStatus = {}; //「チェックされているかどうか」を記録するためのメモ帳を作るコマンド

function generateRow(item, index, sheetName) { //表の１行をHTMLで作る関数。itemには「ポケモンの情報」、indexは「何匹目か」、SheetNameは「どのシートか」を表す。
    const fieldCells = fields.map(f => { //「どのフィールドに出現するか」の表の部分を作るために、６つのフィールドを順番に調べていく
        const found = item.conditions.find(c => c.field === f); //そのポケモンが、今見ている場所（フィールド）に登場するかどうかを探す
        return `<td>${found ? convertRank(found.minRank) : ""}</td>`; //出現するならば必要なランクを表示。出ないならば空白。これをtd~tdのセル形で表示。
    }).join(""); //各フィールドに対して作ったtd~tdの行をすべて結合して１つの長いHTML文字列に変換する。

    const isChecked = checkStatus[index] || false;
    return `<tr>
        <td><input type="checkbox" class="gotcha" data-index="${index}" data-sheet="${sheetName}" ${isChecked ? "checked" : ""}></td>
        <td>${item.no}</td>
        <td>${item.type}</td>
        <td>${"★".repeat(item.rarity)}${"☆".repeat(5 - item.rarity)}</td>
        <td>${item.name}</td>
        ${fieldCells}
    </tr>`;
}

window.onload = () => {
    const tbodyMain = document.getElementById("table-body-main");
    const tbodyWakakusa = document.getElementById("table-body-wakakusa");
    const tbodyCyan = document.getElementByID("table-body-cyan");
    const tbodyTaupe = document.getElementByID("table-body-taupe");
    const tbodyUnohana = document.getElementByID("table-body-unohana");
    const tbodyLapis = document.getElementByID("table-body-lapis");
    const tbodyGold = document.getElementByID("table-body-gold");

    sleepFaces.forEach((item, index) => {
        tbodyMain.insertAdjacentHTML("beforeend", generateRow(item, index, "01_main"));

        if (item.conditions.some(c => c.field === "ワカクサ本島")) {
        tbodyWakakusa.insertAdjacentHTML("beforeend", generateRow(item, index, "02_wakakusa"));

        if (item.conditions.some(c => c.field === "シアンの砂浜")) {
        tbodyCyan.insertAdjacentHTML("beforeend", generateRow(item, index, "03_cyan"));

        if (item.conditions.some(c => c.field === "トープ洞窟")) {
        tbodyTaupe.insertAdjacentHTML("beforeend", generateRow(item, index, "04_taupe"));

        if (item.conditions.some(c => c.field === "ウノハナ雪原")) {
        tbodyUnohana.insertAdjacentHTML("beforeend", generateRow(item, index, "05_unohana"));

        if (item.conditions.some(c => c.field === "ラピスラズリ湖畔")) {
        tbodyLapis.insertAdjacentHTML("beforeend", generateRow(item, index, "06_lapis"));

        if (item.conditions.some(c => c.field === "ゴールド旧発電所")) {
        tbodyGold.insertAdjacentHTML("beforeend", generateRow(item, index, "07_gold"));
        }
    });

    setCheckboxEvents();  // ← 必ずここでイベント追加
};

function setCheckboxEvents() {
    const allCheckboxes = document.querySelectorAll(".gotcha");
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const index = checkbox.getAttribute("data-index");
            const isChecked = checkbox.checked;
            checkStatus[index] = isChecked;
            syncCheckboxes(index);
        });
    });
}

function syncCheckboxes(index) {
    const isChecked = checkStatus[index];
    const relatedCheckboxes = document.querySelectorAll(`.gotcha[data-index='${index}']`);
    relatedCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

// カビゴンランク数値 → ランク名変換用
const rankMap = {
    1: 'ノーマル1', 2: 'ノーマル2', 3: 'ノーマル3', 4: 'ノーマル4', 5: 'ノーマル5',
    6: 'スーパー1', 7: 'スーパー2', 8: 'スーパー3', 9: 'スーパー4', 10: 'スーパー5',
    11: 'ハイパー1', 12: 'ハイパー2', 13: 'ハイパー3', 14: 'ハイパー4', 15: 'ハイパー5',
    16: 'マスター1', 17: 'マスター2', 18: 'マスター3', 19: 'マスター4', 20: 'マスター5',
    21: 'マスター6', 22: 'マスター7', 23: 'マスター8', 24: 'マスター9', 25: 'マスター10',
    26: 'マスター11', 27: 'マスター12', 28: 'マスター13', 29: 'マスター14', 30: 'マスター15',
    31: 'マスター16', 32: 'マスター17', 33: 'マスター18', 34: 'マスター19', 35: 'マスター20'
};

// データベース
const sleepFaces = [
    {
        id: 1,
        number: "0001",
        type: "うとうと",
        rarity: 1,
        name: "フシギダネ",
        conditions: [
            { field: "ワカクサ本島", minRank: 6 },
            { field: "ラピスラズリ湖畔", minRank: 1 }
        ]
    },
    {
        id: 2,
        number: "0181",
        type: "すやすや",
        rarity: 3,
        name: "デンリュウ",
        conditions: [
            { field: "ウノハナ雪原", minRank: 22 },
            { field: "ゴールド旧発電所", minRank: 20 }
        ]
    },
    {
        id: 3,
        number: "0303",
        type: "ぐっすり",
        rarity: 4,
        name: "クチート",
        conditions: [
            { field: "ワカクサ本島", minRank: 23 },
            { field: "トープ洞窟", minRank: 19 },
            { field: "ゴールド旧発電所", minRank: 16 }
        ]
    },
    {
        id: 4,
        number: "0491",
        type: "うとうと",
        rarity: 3,
        name: "ダークライ",
        conditions: [
            { field: "ワカクサ本島", minRank: 1 },
            { field: "シアンの砂浜", minRank: 1 },
            { field: "トープ洞窟", minRank: 1 },
            { field: "ウノハナ雪原", minRank: 1 },
            { field: "ラピスラズリ湖畔", minRank: 1 },
            { field: "ゴールド旧発電所", minRank: 1 }
        ]
    }
];

// チェック状態保存用（今後ローカルストレージ対応も可能）
let checkStatus = {};

// 表を生成
window.onload = () => {
    generateMainTable();
};

// 星表示用
function getRarityStars(rarity) {
    return '★'.repeat(rarity) + '☆'.repeat(5 - rarity);
}

// メインテーブル生成
function generateMainTable() {
    const tbody = document.getElementById('main-table-body');
    tbody.innerHTML = '';

    sleepFaces.forEach((face, index) => {
        const tr = document.createElement('tr');

        // チェックボックス
        const tdCheck = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `gotcha_${index}`;
        checkbox.checked = checkStatus[index] || false;

        // チェックボックスの状態を記録
        checkbox.addEventListener('change', () => {
            checkStatus[index] = checkbox.checked;
            // 他シートとの連動処理は次のSTEPで実装
        });

        tdCheck.appendChild(checkbox);
        tr.appendChild(tdCheck);

        // No.
        const tdNo = document.createElement('td');
        tdNo.textContent = face.number;
        tr.appendChild(tdNo);

        // Type
        const tdType = document.createElement('td');
        tdType.textContent = face.type;
        tr.appendChild(tdType);

        // Rarity
        const tdRarity = document.createElement('td');
        tdRarity.textContent = getRarityStars(face.rarity);
        tr.appendChild(tdRarity);

        // Name
        const tdName = document.createElement('td');
        tdName.textContent = face.name;
        tr.appendChild(tdName);

        // フィールドカラムを作成
        const fields = ["ワカクサ本島", "シアンの砂浜", "トープ洞窟", "ウノハナ雪原", "ラピスラズリ湖畔", "ゴールド旧発電所"];
        fields.forEach(field => {
            const tdField = document.createElement('td');
            const condition = face.conditions.find(c => c.field === field);
            tdField.textContent = condition ? rankMap[condition.minRank] : '';
            tr.appendChild(tdField);
        });

        tbody.appendChild(tr);
    });
}
